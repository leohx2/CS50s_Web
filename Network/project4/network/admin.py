from django.contrib import admin

from .models import Comments, Posts, User

# Register your models here.
admin.site.register(Comments)
admin.site.register(Posts)
admin.site.register(User)