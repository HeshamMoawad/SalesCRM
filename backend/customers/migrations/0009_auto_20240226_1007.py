# Generated by Django 3.2.23 on 2024-02-26 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0008_auto_20240213_1304'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='text',
            field=models.TextField(blank=True, default='', max_length=1500, verbose_name='Text'),
        ),
        migrations.AlterField(
            model_name='subscriptionnote',
            name='note',
            field=models.CharField(max_length=600, verbose_name='Note'),
        ),
    ]
