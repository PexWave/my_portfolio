from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import SocialMedia, Project, Blog, TechnologyUsed
from django.contrib.auth import get_user_model

User = get_user_model()
    
class TechnologyUsedSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyUsed
        fields = [ 'name', 'technology_image_url']


class SocialMediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['url','platform', 'social_media_link']

    def create(self, validated_data):
        user_socialmedia_data = validated_data
        auth_user = self.context['request'].user
        instance = SocialMedia.objects.create(user=auth_user, **validated_data)
        
        return instance


class ProjectSerializer(serializers.ModelSerializer):
    technology = TechnologyUsedSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'title', 'img', 'tag','technology', 'date', 'github_link','preview_link', 'description']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    user_technology = TechnologyUsedSerializer(many=True, read_only=True)
    user_project = ProjectSerializer(many=True, read_only=True)
    user_socmed = SocialMediaSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name',
         'middle_name', 'self_description', 'email',
          'address', 'phone_number', 'about_me', 'user_technology',
          'user_project', 'user_socmed',
           'position', 'resume']
    
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



class BlogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Blog
        fields = ['url', 'title', 'tag', 'description', 'date']

    def create(self, validated_data):
        auth_user = self.context['request'].user
        instance = Blog.objects.create(user=auth_user, **validated_data)
        
        return instance


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class PersonalInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'first_name', 'last_name', 'email', 'address', 'phone_number', 'position']


class EmailSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    subject = serializers.CharField(max_length=250)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=None)
