from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="encyclopedia-index"),
    path("wiki/", views.index),
    path("wiki/<str:title>/", views.content, name="encyclopedia-content"),
    path("search/", views.search, name="encyclopedia-search"),
    path("newpage/", views.newpage, name="encyclopedia-new-page"),
    path("random/", views.random_page, name="encyclopedia-random"),
    path("edit/<str:title_edit>", views.edit_page, name="encyclopedia-edit")
]

