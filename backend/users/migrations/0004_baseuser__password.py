# Generated by Django 3.2.23 on 2024-02-11 11:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_manager_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='baseuser',
            name='_password',
            field=models.CharField(default=django.utils.timezone.now, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
    ]
