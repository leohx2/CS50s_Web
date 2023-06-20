from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Posts(models.Model):
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
            'username': self.FK_user.username
        }

class Comments(models.Model):
    comments = models.ManyToManyField(Posts, related_name="comments")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    FK_post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="post_comments")

    def __str__(self):
        return f'Comment - {self.id} from post - {self.FK_post.id}'
