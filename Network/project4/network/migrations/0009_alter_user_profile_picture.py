# Generated by Django 4.1.5 on 2023-07-04 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_user_profile_picture_alter_posts_likes_from_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(default='images/noPicture.png', upload_to='images/'),
        ),
    ]
