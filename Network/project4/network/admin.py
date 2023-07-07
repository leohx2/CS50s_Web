from django.contrib import admin

from .models import Comments, Posts, Profile, User

# Register your models here.
admin.site.register(Comments)
admin.site.register(Profile)
admin.site.register(Posts)
admin.site.register(User)

