# Generated by Django 4.2 on 2024-06-23 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_technologyused_technology_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='technologyused',
            name='name',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]