from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listings(models.Model):
    bidsUntilNow = models.IntegerField(default=0)
    category = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=300)
    imageUrl = models.URLField(blank=True, null=True)
    minBid = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    title = models.CharField(max_length=64)
    winner_id = models.IntegerField(blank=True, null=True)
    is_close = models.BooleanField(default=False)
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE)
    # to access items from user e.g Listings.objects.filter(FK_user__username="leo")
                                                        # Note there is two underlines
    def __str__(self):
        return f'List - "{self.title}", user - {self.FK_user.username}'


class Bids(models.Model):
    bid = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    FK_list = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="list_bids")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE,  related_name="user_bids")
    
    def __str__(self):
        return f'Bid {self.bid}, from list - {self.FK_list.title}'


class Comments(models.Model):
    comment = models.CharField(max_length=240)
    FK_list = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="list_comments")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE,  related_name="user_comments")
    
    def __str__(self):
        return f'Comment from {self.FK_user.username} to the list {self.FK_list.title}'


class WatchList(models.Model):
    FK_list = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="list_watchList")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_watchlist")

    def __str__(self):
        return f'Watchlist {self.FK_list.title} to the user {self.FK_user.username}'