# Generated by Django 4.1.5 on 2023-07-07 07:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0012_follow_fk_followers_users_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follow',
            name='FK_followers_users',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='followers_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
