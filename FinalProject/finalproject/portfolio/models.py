from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    

# Post model, basically nothing but just to create an ID to make a reference to thumbnail, image and text models
class Post(models.Model): 
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title


# Image content related to a post
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    borderRadius = models.CharField(max_length=10) # String format, the information will be saved like "10px".
    FK_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_image")
    position = models.IntegerField()
    size = models.CharField(max_length=10) # String format, the information will be saved like "small" "medium" or "big".
    url = models.URLField(max_length=400)
    
    def __str__(self):
        return f'Image {self.id}, position {self.position} from post {self.FK_post.title}'
    
    def serialize(self):
        return {
            'borderRadius': self.borderRadius,
            'id': self.id,
            'position':self.position,
            'post': self.FK_post.id,
            'size': self.size,
            'url': self.url,
            'type': "image"
        }


# Text content related to a post
class Text(models.Model):
    id = models.AutoField(primary_key=True)
    text_content = models.CharField(max_length=1000, default="noText")
    FK_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_text")
    position = models.IntegerField()

    def __str__(self):
        return f'Text {self.id}, position {self.position} from post {self.FK_post.title}'

    def serialize(self):
        return {
            'id': self.id,
            'content': self.text_content,
            'position': self.position,
            'post': self.FK_post.id,
            'type': "text"
        }


# Thumbnail content related to a post
class Thumbnail(models.Model):
    id = models.AutoField(primary_key=True)
    borderRadius = models.CharField(max_length=10, default=0) # String format, the information will be saved like "10px".
    category = models.CharField(max_length=15)
    FK_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_thumbnail")
    image_url = models.URLField(max_length=400)
    title = models.CharField(max_length=100)
    title_weight = models.CharField(max_length=10) # String format to make it easier to parse later on

    def serialize(self):
        return {
            'id': self.id,
            'borderRadius': self.borderRadius,
            'category': self.category,
            'post': self.FK_post.id,
            'image_url': self.image_url,
            'title': self.title,
            'title_weight': self.title_weight
        }
    
    def __str__(self):
        return f'Thumbnail of the post {self.FK_post.title}'
