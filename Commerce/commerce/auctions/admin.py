from django.contrib import admin

from .models import Bids, Comments, Listings, User, WatchList

# Register your models here.
admin.site.register(Bids)
admin.site.register(Comments)
admin.site.register(Listings)
admin.site.register(User)
admin.site.register(WatchList)