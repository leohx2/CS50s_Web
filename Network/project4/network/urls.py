
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("infoPost/<str:username>", views.infoPost, name="infoPost"),
    path("editPost/<str:post_id>", views.editPost, name="editPost"),
    path("follow/<str:profile>", views.follow, name="follow"),
    path("followingPosts", views.followingPosts, name="followingPosts"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("newPost", views.newPost, name="newPost"),
    path("postLikes/<str:post_id>", views.postLikes, name="postLikes"),
    path("profile/<str:profile>", views.renderProfile, name="renderProfile"),
    path("register", views.register, name="register"),
]
