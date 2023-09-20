from django.contrib import admin

from .models import Image, Post, Text, Thumbnail, User

# Register your models here.
admin.site.register(User)
admin.site.register(Image)
admin.site.register(Post)
admin.site.register(Thumbnail)
admin.site.register(Text)