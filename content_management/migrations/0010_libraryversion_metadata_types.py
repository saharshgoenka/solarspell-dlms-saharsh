# Generated by Django 3.0.4 on 2020-11-10 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_management', '0009_auto_20201021_2016'),
    ]

    operations = [
        migrations.AddField(
            model_name='libraryversion',
            name='metadata_types',
            field=models.ManyToManyField(blank=True, to='content_management.MetadataType'),
        ),
    ]