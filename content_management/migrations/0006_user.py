# Generated by Django 3.0.4 on 2020-08-18 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_management', '0005_content_reviewed_on'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
    ]