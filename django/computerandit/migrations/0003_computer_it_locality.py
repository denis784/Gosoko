# Generated by Django 4.1.7 on 2023-08-23 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('computerandit', '0002_remove_computer_it_region'),
        ('locations', '0002_locality_remove_region_county_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='computer_it',
            name='locality',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='locations.locality'),
        ),
    ]
