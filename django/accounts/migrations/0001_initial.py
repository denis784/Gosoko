# Generated by Django 4.1.7 on 2023-06-27 10:53

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=64)),
                ('code', models.CharField(max_length=7)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Activation Code',
                'verbose_name_plural': 'Activation Codes',
            },
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(max_length=32, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=20)),
                ('country_code', django_countries.fields.CountryField(blank=True, max_length=2)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_customer', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_support', models.BooleanField(default=False)),
                ('is_merchant', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
            ],
            options={
                'verbose_name': 'Admin',
                'verbose_name_plural': 'Admins',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('accounts.account',),
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
            ],
            options={
                'verbose_name': 'Customer',
                'verbose_name_plural': 'Customers',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('accounts.account',),
        ),
        migrations.CreateModel(
            name='Merchant',
            fields=[
            ],
            options={
                'verbose_name': 'Merchant',
                'verbose_name_plural': 'Merchants',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('accounts.account',),
        ),
        migrations.CreateModel(
            name='Support',
            fields=[
            ],
            options={
                'verbose_name': 'Technical Support',
                'verbose_name_plural': 'Technical Support',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('accounts.account',),
        ),
    ]
