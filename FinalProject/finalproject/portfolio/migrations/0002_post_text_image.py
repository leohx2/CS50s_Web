# Generated by Django 4.1.5 on 2023-09-20 15:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Text',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('position', models.IntegerField()),
                ('FK_post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_text', to='portfolio.post')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('borderRadius', models.CharField(max_length=10)),
                ('position', models.IntegerField()),
                ('size', models.CharField(max_length=10)),
                ('url', models.URLField(max_length=400)),
                ('FK_post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_image', to='portfolio.post')),
            ],
        ),
    ]
