# Generated by Django 4.1.5 on 2023-02-18 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0007_listings_is_close_alter_comments_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listings',
            old_name='minBid',
            new_name='currentBid',
        ),
    ]
