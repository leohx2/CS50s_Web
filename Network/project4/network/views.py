import datetime
import json

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

# Creating a new Post
def newPost(request):
    user = request.user
    if request.method == "POST" and user:
        post_content = request.POST["postContent"]
        
        # Creating a post
        post = Posts(FK_user=user, content=post_content.rstrip(), timestamp=datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        post.save()
        # Todo -> adding error handling, like no user, blank fields, maxlen 
    return HttpResponseRedirect(reverse("index"))

def infoPost(request):
    user = request.user
    posts = Posts.objects.all()
    data = [post.serialize() for post in posts]
    data.append(user.serialize())
    print(f"\n\n{data}\n\n")
    return JsonResponse(data, safe=False)