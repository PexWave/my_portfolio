from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    position = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    self_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.username


class SocialMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_socmed")
    platform = models.CharField(max_length=250, null=True, blank=True)
    social_media_link = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.platform


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_project")
    title = models.CharField(max_length=250, blank=True, null=True)
    img = models.ImageField(max_length=250, upload_to='images/', null=True, blank=True)
    tag = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(null=True, blank=True)