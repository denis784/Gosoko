# Generated by Django 4.1.7 on 2023-06-27 10:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import products.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('business', '0001_initial'),
        ('appliances', '0001_initial'),
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Phone_Tablet_Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='ICONS')),
                ('verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Condition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Memory_Metric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'verbose_name': 'Phone and Tablet Memory Metric',
                'verbose_name_plural': 'Phone and Tablet Memory Metrics',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Memory_Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'verbose_name': 'Phone and Tablet Memory Type',
                'verbose_name_plural': 'Phone and Tablet Memory Types',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Operating_System',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='ICONS')),
            ],
            options={
                'verbose_name': 'Phone and Tablet operating system',
                'verbose_name_plural': 'Phone and Tablet operating systems',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Ram_Metric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'verbose_name': 'Phone and Tablet Ram Metric',
                'verbose_name_plural': 'Phone and Tablet Ram Metrics',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Screen_Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'verbose_name': 'Phone and Tablet Screen Size',
                'verbose_name_plural': 'Phone and Tablet Screen Sizes',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Sub_Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('category', models.ManyToManyField(to='phoneandtablet.phone_tablet_category')),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Weight_Metric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'verbose_name': 'Phone and Tablet Weight Metric',
                'verbose_name_plural': 'Phone and Tablet Weight Metrics',
            },
        ),
        migrations.CreateModel(
            name='Phone_Tablet_Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('subcategory', models.ManyToManyField(to='phoneandtablet.phone_tablet_sub_category')),
            ],
        ),
        migrations.CreateModel(
            name='Phone_Tablet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image1', django_resized.forms.ResizedImageField(crop=None, force_format='WEBP', keep_meta=False, quality=97, scale=None, size=[600, 600], upload_to=products.models.upload_location)),
                ('image2', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='WEBP', keep_meta=False, null=True, quality=97, scale=None, size=[600, 600], upload_to=products.models.upload_location)),
                ('image3', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='WEBP', keep_meta=False, null=True, quality=97, scale=None, size=[600, 600], upload_to=products.models.upload_location)),
                ('image4', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='WEBP', keep_meta=False, null=True, quality=97, scale=None, size=[600, 600], upload_to=products.models.upload_location)),
                ('image5', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='WEBP', keep_meta=False, null=True, quality=97, scale=None, size=[600, 600], upload_to=products.models.upload_location)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('currency', models.CharField(default='KES', max_length=5)),
                ('quantity', models.SmallIntegerField(default=1)),
                ('negotiable', models.BooleanField(default=False)),
                ('sponsored', models.BooleanField(default=False)),
                ('featured', models.BooleanField(default=False)),
                ('new', models.BooleanField(default=False)),
                ('most_sold', models.BooleanField(default=False)),
                ('out_of_stock', models.BooleanField(default=False)),
                ('rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('product_serial', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=500, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=150)),
                ('model', models.CharField(blank=True, max_length=150, null=True)),
                ('processor', models.CharField(blank=True, max_length=150, null=True)),
                ('ram', models.CharField(blank=True, max_length=150, null=True)),
                ('storage', models.CharField(blank=True, max_length=4, null=True)),
                ('weight', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('brand', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phone_items', to='phoneandtablet.phone_tablet_category')),
                ('color', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_color')),
                ('condition', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_condition')),
                ('material', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_material')),
                ('operating_system', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_operating_system')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='business.business')),
                ('packaging', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='appliances.package')),
                ('per', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='appliances.per')),
                ('ram_metrics', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_ram_metric')),
                ('region', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='locations.region')),
                ('screen_size', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_screen_size')),
                ('size', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_size')),
                ('storage_metrics', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_memory_metric')),
                ('subcategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phone_subitems', to='phoneandtablet.phone_tablet_sub_category')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phone_subtypeitems', to='phoneandtablet.phone_tablet_type')),
                ('weight_metrics', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='phoneandtablet.phone_tablet_weight_metric')),
            ],
            options={
                'verbose_name': 'Phone and Tablet Product',
                'verbose_name_plural': 'Phone and Tablet Products',
            },
        ),
    ]
