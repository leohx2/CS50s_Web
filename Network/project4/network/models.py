from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Posts(models.Model):
    content = models.CharField(max_length=340)
    timestamp = models.CharField(max_length=50)
    likes = models.IntegerField(default=0)
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")

    def __str__(self):
        return f'Post - "{self.id}", user - {self.FK_user.username}'

class Comments(models.Model):
    comments = models.ManyToManyField(Posts, related_name="comments")
    FK_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    FK_post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="post_comments")

    def __str__(self):
        return f'Comment - {self.id} from post - {self.FK_post.id}'
