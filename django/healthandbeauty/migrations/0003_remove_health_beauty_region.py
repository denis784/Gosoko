# Generated by Django 4.1.7 on 2023-08-23 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('healthandbeauty', '0002_health_beauty_packaging_health_beauty_per'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='health_beauty',
            name='region',
        ),
    ]
