# Generated by Django 4.1.6 on 2023-09-22 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_rename_fk_post_id_image_fk_post_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='thumbnail',
            name='borderRadius',
            field=models.CharField(default=0, max_length=10),
        ),
    ]
