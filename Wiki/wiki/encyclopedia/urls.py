from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="encyclopedia-index"),
    path("wiki/", views.index),
    path("wiki/<str:title>/", views.content, name="encyclopedia-content"),
    path("search/", views.search, name="encyclopedia-search")
]
