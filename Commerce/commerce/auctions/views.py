from decimal import *

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from .helper import ListingClass
from .models import Bids, Listings, User
# Listings models has a Title, description, imageUrl(optional), category(optional), FK_user

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
            messages.error(request, "Invalid username and/or password.")
            return render(request, "auctions/login.html")
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


def new_listing(request):
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
            # If there is an error refresh the page and display a message.
            for i in errors:
                messages.error(request, i)
            return render(request, "auctions/newListing.html")
        else:
            # if no erros were found we can now create the listing db
            l_db = Listings(title=data.title, description=data.description, imageUrl=data.url, category=data.category,
             FK_user=request.user, minBid=data.bid)
            l_db.save()
        
    return render(request, "auctions/newListing.html", {"messages": errors})


def listing_page(request, list_pk):
    listing_data = Listings.objects.filter(pk=list_pk)
    bid_data = Bids.objects.filter(FK_list__pk=list_pk)
    context = {}
    if len(listing_data) == 0:
        # if there is no Listing with that id (primary key) returns to index with a message error
        messages.error(request, 'Listing not found.')
        return HttpResponseRedirect(reverse("index"))
    elif len(listing_data) > 0 and len(bid_data) == 0:
        # if there is a list without bids context gets the listing and bid gets a None value, check the html file to understand that part
        context.update({'listing': listing_data[0], 'bid':None})
    else:
        # If there is a list with bid the last bid is loaded it's never possible to add a new bid lower than the previous so the lastest is also the higher 
        context.update({'listing': listing_data[0], 'bid':Bids.objects.filter(FK_list__pk=list_pk).latest('bid')})

    return render(request, "auctions/listingpage.html", context)


@login_required
def new_bid(request, list_pk):
    
    if request.method == 'POST':
        current_user = request.user
        listing_data = Listings.objects.get(id=list_pk)
        bid = Decimal(request.POST["bid"])
        has_bid = Bids.objects.filter(FK_list__pk=list_pk)
        # If this is the first bid and the bid is greater than the minBid, register the bid, otherwhise error.
        if len(has_bid) == 0 and bid > listing_data.minBid:
            bid_register = Bids(bid=bid, FK_list=listing_data, FK_user=current_user)
            bid_register.save()
            listing_data.bidsUntilNow += 1
            listing_data.save()
        elif len(has_bid) == 0 and bid <= listing_data.minBid:
            messages.error(request, 'Bid Must be greater than the minimum bid.')
            return HttpResponseRedirect(reverse('listing_page', args=[list_pk]))
        
        # If it has another bid check the lastest to find out if it's bigger or not. 
        last_bid = Bids.objects.filter(FK_list__pk=list_pk).latest('bid')
        if bid <= last_bid.bid:
            messages.error(request, 'Bid Must be greater than the currently bid.')
            return HttpResponseRedirect(reverse('listing_page', args=[list_pk]))
        else:
            bid_register = Bids(bid=bid, FK_list=listing_data, FK_user=current_user)
            bid_register.save()
            listing_data.bidsUntilNow += 1
            listing_data.save()

    return HttpResponseRedirect(reverse('listing_page', args=[list_pk]))