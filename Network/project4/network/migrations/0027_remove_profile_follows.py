# Generated by Django 4.1.5 on 2023-07-07 08:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0026_remove_user_fk_followers_users_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='follows',
        ),
    ]
