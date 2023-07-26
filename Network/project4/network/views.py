import datetime
import json

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Posts, Profile, User


def index(request, page=1):
    # page var is an optional value that by default is 1, use to indicate the current page on the site.
    posts = Posts.objects.all()
    context = {'posts': posts}
    return render(request, "network/index.html", context)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.warning(request, 'Invalid username and/or password.')
            return render(request, "network/login.html")
    else:
        return render(request, "network/login.html")


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            messages.warning(request, 'Passwords must match.')
            return render(request, "network/register.html")

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            messages.warning(request, 'Username already taken.')
            return render(request, "network/register.html")
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

# Creating a new Post
@login_required
def newPost(request):
    user = request.user
    if request.method == "POST":
        post_content = request.POST["postContent"]
        
        # Creating a post
        post = Posts(FK_user=user, content=post_content.rstrip(), timestamp=datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        post.save()

        # Todo -> adding error handling, like no user, blank fields, maxlen 
    return HttpResponseRedirect(reverse("index"))

def locationErrorPage(username):
    # Check if the user is trying to acess an incorrect page from the home, profile or following page to indicate a better error message.
    # the output message will be something like: The {return of that function} page {page} does not exist, the last page is {pages.num_pages} we can check it on the "infoPost" function
    if username == 'all':
        return 'Home'
    if username == 'following':
        return 'Following'
    else:
        return f'{username} profile'


def infoPost(request, username, page=1):
    # Send info from all posts to js
    # if username == all, we send info about all posts, otherwise just from the username
    user = request.user
    if username == 'all':
        posts = Posts.objects.all()
    elif username == 'following' and user.id != None:
        profile = Profile.objects.get(userProfile=user).follows.all()
        userList = [index.userProfile.username for index in profile]
        posts = Posts.objects.filter(FK_user__username__in=userList)
    else:
        posts = Posts.objects.filter(FK_user__username=username)
    posts = posts.order_by("-pk").all()

    # Pages will work as the paginator variable
    pages = Paginator(posts, 2)

    # If the variable "page" is greater than pages.num_pages we return it to index with an error message 
    print(f"\n\nLAB \n----- \n{pages.num_pages}\n-----\n")
    if page > pages.num_pages or page <= 0:
        messages.warning(request, f'The {locationErrorPage(username)} page {page} does not exist, the last page is {pages.num_pages}')
        return HttpResponseRedirect(reverse("index"))
    data2 = {'posts': [post.serialize() for post in pages.page(page)], 
            'user': user.serialize() if user.id != None else False,
            'num_pages': pages.num_pages,
            }
    return JsonResponse(data2, safe=False)


# Updating likes data base
@csrf_exempt
def postLikes(request, post_id):
    # page var is an optional value that by default is 1, use to indicate the current page on the site.
    user = request.user
    if request.method == "PUT":
        # Data received from js to updated info about the post, if the user likes it we get True
        # After that we will change on DB based on the info received, eg:
        # If the the post was already liked data gets False, if the post was not liked data gets True
        data = json.loads(request.body)
        
        # Get the post db
        post = Posts.objects.get(pk = post_id)
        if data["like"] == True:
            post.likes_from_users.add(user)
            post.save()
        elif data["like"] == False:
            post.likes_from_users.remove(user)
            post.save()
        return JsonResponse(post.likes_from_users.count(), safe=False)
    

@csrf_exempt
@login_required
def editPost(request, post_id):
    user = request.user
    if request.method == 'PUT':

        # Data received from js
        data = json.loads(request.body)

        # Get the post to update only if the user is equal to the post user
        post = Posts.objects.get(pk = post_id)

        # Check if the user is the real post author
        if user != post.FK_user:
            messages.warning(request, 'You can only edit your own posts.')
            return render(request, "network/index.html")
        else:
            # Save the new content
            post.content = data["content"]
            post.save()
        return JsonResponse({'status': 'done'}, safe=False)


def renderProfile(request, profile, page=1):
    try:
        # Get the userData and the profile page info as well
        userData = User.objects.get(username=profile)
        userProfile = Profile.objects.get(userProfile=userData)
    except User.DoesNotExist:
        messages.warning(request, f'The user {profile} does not exist.')
        return HttpResponseRedirect(reverse("index"))
    follows = userProfile.follows.all()
    followers = userProfile.followers.all()

    # Check if the user is following or not the current profile and send the information to the template
    user = request.user
    if user.username != "":
        currentUserProfile = Profile.objects.get(userProfile=user)
        if currentUserProfile in followers:
            isFollowing = "Unfollow"
        else:
            isFollowing = "Follow"
    else:
        isFollowing = "Login Necessary"

    context = {'userProfile': userData.username, 'userdata': userData, 'follows':follows, 'followers': followers, 'isFollowing':isFollowing}
    return render(request, "network/profile.html", context)


@csrf_exempt
@login_required
def follow(request, profile):
    user = request.user
    followed = User.objects.get(username=profile)
    if request.method == 'PUT':
     
        # Profile to add or remove data in the "follows" row
        profileFollow = Profile.objects.get(userProfile=followed)
            
        # The user profile
        userProfile = Profile.objects.get(userProfile=user)

        # Check if the user is following or not profileFollow
        if userProfile in profileFollow.followers.all():
            # Remove the profile to follow in the Follows db
            userProfile.follows.remove(profileFollow)
            userProfile.save()

            # Remove the user profile in the Followers db from the profile followed
            profileFollow.followers.remove(userProfile)
            profileFollow.save()
            return JsonResponse({'status': 'unfollowing', 'current': len(profileFollow.followers.all())}, safe=False)
        else:
            #Save the profile to follow in the Follows db
            userProfile.follows.add(profileFollow)
            userProfile.save()

            # Save the user profile in the Followers db from the profile followed
            profileFollow.followers.add(userProfile)
            profileFollow.save()
            return JsonResponse({'status': 'following', 'current': len(profileFollow.followers.all())}, safe=False)


@login_required
def followingPosts(request, page=1):
    # page var is an optional value that by default is 1, use to indicate the current page on the site.
    return render(request, "network/following.html")