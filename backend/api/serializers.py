from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import SocialMedia, Project, Blog
from django.contrib.auth import get_user_model

User = get_user_model()

class SocialMediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['url','platform', 'social_media_link']

    def create(self, validated_data):
        user_socialmedia_data = validated_data
        auth_user = self.context['request'].user
        instance = SocialMedia.objects.create(user=auth_user, **validated_data)
        
        return instance

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'img', 'tag', 'description']



class BlogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Blog
        fields = ['url', 'title', 'tag', 'description', 'date']

    def create(self, validated_data):
        auth_user = self.context['request'].user
        instance = Blog.objects.create(user=auth_user, **validated_data)
        
        return instance


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'middle_name', 'self_description', 'email', 'address', 'phone_number', 'position']
    
    # def create(self, validated_data):
    #     user_socialmedia_data = validated_data.pop('user_socmed')
    #     user = User.objects.create(**validated_data)
    #     for social_media in user_socialmedia_data:
    #         SocialMedia.objects.create(user=user, **user_socialmedia_data)
    #     return user

    # def update(self, instance, validated_data):
    #     item_data = validated_data.pop('user_socmed')
    #     user = self.context['request'].user
    #     social_media_data_list = [
    #         {key: value for key, value in item.items()} for item in item_data
    #     ]
    #     print(item_data)

    #     for social_media_data in social_media_data_list:
    #         SocialMedia.objects.update_or_create(user=user,defaults=social_media_data)
            
    #     return instance

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class PersonalInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'first_name', 'last_name', 'email', 'address', 'phone_number', 'position']


