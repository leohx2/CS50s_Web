from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home", views.index, name="index"),
    path("about_me", views.about, name="about"),
    path("contact", views.contact, name="contact"),
    path("loginAuthor", views.login_view, name="loginAuthor"),
    path("logout", views.logout_view, name="logout"),
    path("newProject", views.newProject, name="newProject"),
    path("project/<str:id>", views.project_render, name="project_render"),
    path("projects", views.projects, name="projects"),
    path("thumb_details/<str:categoryRender>", views.thumb_details, name="thumb_details"),
]