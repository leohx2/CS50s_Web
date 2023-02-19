from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newListing", views.new_listing, name="new_listing"),
    path("listing/<int:list_pk>", views.listing_page, name="listing_page"),
    path("bid/<int:list_pk>", views.new_bid, name="new_bid"),
    path("watchlist/<int:list_pk>/<str:add_or_remove>", views.add_to_watch_list, name="watchlist"),
    path("comment/<int:list_pk>", views.add_comment, name="add_comment"),
    path("closelisting/<int:list_pk>", views.close_listing, name='close_listing'),
    path("mywatchlist", views.my_watch_list, name='my_watchlist'),
    path("categories/<str:category>", views.render_categories, name="categories")
]
