# Generated by Django 4.1.5 on 2023-09-20 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_thumbnail'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='FK_post_id',
            new_name='FK_post',
        ),
        migrations.RenameField(
            model_name='text',
            old_name='FK_post_id',
            new_name='FK_post',
        ),
        migrations.RenameField(
            model_name='thumbnail',
            old_name='FK_post_id',
            new_name='FK_post',
        ),
        migrations.AddField(
            model_name='text',
            name='text_content',
            field=models.CharField(default='noText', max_length=1000),
        ),
    ]
