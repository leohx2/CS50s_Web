from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Listings(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=300)
    imageUrl = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=30, blank=True, null=True)
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE)
    # to access items from user e.g Listings.objects.filter(FK_user__username="leo")
                                                        # Note there is two underlines
    def __str__(self):
        return f'List - "{self.title}", user - {self.FK_user.username}'


class Bids(models.Model):
    bid = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    FK_list = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="bids")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Bid {self.bid}, from list - {self.FK_list.title}'


class Comments(models.Model):
    comment = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    FK_list = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="comments")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Comment from {self.FK_user.username} to the list {self.FK_list.title}'
