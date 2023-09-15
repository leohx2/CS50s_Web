from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home", views.index, name="index"),
    path("contact", views.contact, name="contact"),
    path("loginAuthor", views.login_view, name="loginAuthor"),
    path("logout", views.logout_view, name="logout"),
    path("newProject", views.newProject, name="newProject"),
]