from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    profile_picture = models.ImageField(default="images/noPicture.png", upload_to="images/")
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }


class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    userProfile = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    follows = models.ManyToManyField('self', related_name="user_following", symmetrical=False, blank=True)
    followers = models.ManyToManyField('self', related_name="followed_by", symmetrical=False, blank=True)
    def __str__(self):
        return self.userProfile.username
    

# Create a profile when a new user signs up
def create_profile (sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(userProfile=instance)
        user_profile.save()

# Connect the user creation to a profile creation
post_save.connect(create_profile, sender=User)


class Posts(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=340)
    timestamp = models.CharField(max_length=50)
    likes_from_users = models.ManyToManyField("User", related_name="likes_posts", blank=True)
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    
    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp,
            'users_likes': [likes.id for likes in self.likes_from_users.all()] if self.likes_from_users else None,
            'username': self.FK_user.username,
            'picture': self.FK_user.profile_picture.url
        }

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    comments = models.ManyToManyField(Posts, related_name="comments")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")

    def __str__(self):
        return f'Comment - {self.id} from post - {self.FK_post.id}'

