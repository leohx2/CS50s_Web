import datetime
import json

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Posts, User


def index(request):
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

# def doWhatiWant():
#     post = Posts.objects.all()
#     for i in post:
#         print(f"\n{i.likes_from_users.all()}\n")


def infoPost(request, username):
    # Send info from all posts to js
    # if username == all, we send info about all posts, otherwise just from the username
    user = request.user
    if username == 'all':
        posts = Posts.objects.all()
    else:
        posts = Posts.objects.filter(FK_user__username=username)
    posts = posts.order_by("-pk").all()
    data = [post.serialize() for post in posts]
    if user.id != None:
        data.append(user.serialize())
    else:
        data.append(False)
    return JsonResponse(data, safe=False)


# Updating likes data base
@csrf_exempt
def postLikes(request, post_id):
    user = request.user
    if request.method == "PUT":
        # Data receive from js a updated info about the post, if the user likes it we get Frue
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
    


def renderProfile(request, profile):
    try:
        userProfile = User.objects.get(username=profile)
    except User.DoesNotExist:
        messages.warning(request, f'The user {profile} does not exist.')
        return HttpResponseRedirect(reverse("index"))
    return render(request, "network/profile.html", { 'userProfile': userProfile.username, 'userdata': userProfile })