# Generated by Django 3.2.23 on 2024-02-11 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_baseuser__password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='_password',
            field=models.CharField(max_length=128, verbose_name='Password Without Hash (Required)'),
        ),
    ]
