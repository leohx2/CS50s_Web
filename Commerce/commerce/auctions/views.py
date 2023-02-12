from decimal import *

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .helper import ListingClass
from .models import User


def index(request):
    return render(request, "auctions/index.html")


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def newListing(request):
    # Decimal library config 
    getcontext().prec = 2
    errors = []
    if request.method == "POST":
        # class init -> def __init__(self, title, description, bid, category=None, url=None):
        data = ListingClass(request.POST["title"], request.POST["description"], 
            Decimal(request.POST["bid"]), request.POST["category"], request.POST["url"])
        # data.valid_data returns a list with all errors detected, if errors len == 0 means it has no errors
        errors = data.valid_data()
        if len(errors) > 0:
            # If there is an error display a message and refresh the page.
            return render(request, "auctions/newListing.html", {"messages": errors})
        
    return render(request, "auctions/newListing.html", {"messages": errors})