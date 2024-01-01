# Generated by Django 4.1.7 on 2023-08-23 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0002_locality_remove_region_county_and_more'),
        ('sporting', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sport_gooding',
            name='region',
        ),
        migrations.AddField(
            model_name='sport_gooding',
            name='locality',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='locations.locality'),
        ),
    ]
