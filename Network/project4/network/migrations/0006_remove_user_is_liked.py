# Generated by Django 4.1.5 on 2023-06-19 08:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0005_remove_posts_likes_posts_fk_likes_from_users_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_liked',
        ),
    ]