# Generated by Django 3.2.23 on 2024-02-27 09:32

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0009_auto_20240226_1007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='uuid',
            field=models.CharField(default=uuid.uuid4, max_length=200, unique=True, verbose_name='UUID'),
        ),
        migrations.AlterField(
            model_name='subscription',
            name='uuid',
            field=models.CharField(default=uuid.uuid4, max_length=200, unique=True, verbose_name='UUID'),
        ),
    ]