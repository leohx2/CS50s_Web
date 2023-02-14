from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newListing", views.new_listing, name="new_listing"),
    path("listing/<int:list_pk>", views.listing_page, name="listing_page"),
    path("bid/<int:list_pk>", views.new_bid, name="new_bid")
]
