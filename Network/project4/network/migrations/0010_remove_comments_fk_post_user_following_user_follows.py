# Generated by Django 4.1.5 on 2023-07-06 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_alter_user_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='FK_post',
        ),
        migrations.AddField(
            model_name='user',
            name='following',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='follows',
            field=models.IntegerField(default=0),
        ),
    ]
