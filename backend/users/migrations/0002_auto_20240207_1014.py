# Generated by Django 3.2.23 on 2024-02-07 08:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CS',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.baseuser')),
            ],
            options={
                'verbose_name': 'CS',
                'verbose_name_plural': 'CS',
            },
            bases=('users.baseuser',),
        ),
        migrations.CreateModel(
            name='Sales',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.baseuser')),
            ],
            options={
                'verbose_name': 'Sales',
                'verbose_name_plural': 'Sales',
            },
            bases=('users.baseuser',),
        ),
        migrations.AlterModelOptions(
            name='baseuser',
            options={'verbose_name': 'BaseUser', 'verbose_name_plural': 'BaseUsers'},
        ),
        migrations.AlterModelOptions(
            name='manager',
            options={'verbose_name': 'Manager', 'verbose_name_plural': 'Manager'},
        ),
        migrations.AlterModelManagers(
            name='manager',
            managers=[
            ],
        ),
    ]
