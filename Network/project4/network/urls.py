
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newPost", views.newPost, name="newPost"),
    path("infoPost/<str:username>", views.infoPost, name="infoPost"),
    path("postLikes/<str:post_id>", views.postLikes, name="postLikes"),
    path("<str:profile>", views.renderProfile, name="renderProfile"),
    path("follow/<str:profile>", views.follow, name="follow"),
]
