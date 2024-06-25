from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    position = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    self_description = models.TextField(null=True, blank=True)
    about_me = models.TextField(null=True, blank=True)
    resume = models.FileField(upload_to='resume/', null=True, blank=True)

    def __str__(self):
        return self.username


class SocialMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_socmed")
    platform = models.CharField(max_length=250, unique=True, null=True, blank=True)
    social_media_link = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.platform


class TechnologyUsed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_technology")
    name = models.CharField(max_length=250, blank=True, null=True)
    technology_image_url = models.URLField(max_length=500, blank=True, null=True)


    def __str__(self):
        return self.name


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_project")
    title = models.CharField(max_length=250, blank=True, null=True)
    img = models.ImageField(max_length=250, upload_to='images/', null=True, blank=True)
    tag = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    technology = models.ManyToManyField(TechnologyUsed, null=True, related_name="project_technology")
    preview_link = models.URLField(max_length=500, blank=True, null=True)
    github_link = models.URLField(max_length=500, blank=True, null=True)
    date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_blog")
    title = models.CharField(max_length=250, blank=True, null=True)
    tag = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    