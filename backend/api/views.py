from oauth2_provider.models import RefreshToken
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from .models import SocialMedia, Blog, Project
from django.contrib.auth.models import Group
from rest_framework import permissions, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view, permission_classes
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.db import transaction
from django.conf import settings
from requests.auth import HTTPBasicAuth
import requests
import base64
import os
User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(password)
    url = os.getenv('TOKEN_URL')
    client_id = os.getenv('AUTHENTICATOR_ID')
    client_secret = os.getenv('AUTHENTICATOR_SECRET')

    data = {
        'grant_type': 'password',
        'username': username,
        'password': password,
    }

    auth = HTTPBasicAuth(client_id, client_secret)

    response = requests.post(url, data=data, auth=auth)
    print(url)
    if response.status_code == 200:
        httpres = Response(
            {
            "user":base64.b64encode(format(username).encode("utf-8")),
            "res":response.json()
            })
        httpres.set_cookie('refresh_token', response.json().get('refresh_token'), httponly=True, secure=True)

        return httpres
    else:
        return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
@permission_classes([AllowAny])
def refresh_token(request):

    url = os.getenv('TOKEN_URL')
    client_id = os.getenv('AUTHENTICATOR_ID')
    client_secret = os.getenv('AUTHENTICATOR_SECRET')

    refresh_token = request.COOKIES.get('refresh_token')
    

    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id":client_id,
        "client_secret":client_secret
    } 

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:

        httpres = Response(
            {"access_token":response.json().get('refresh_token'),
            "user":base64.b64encode(format("user").encode("utf-8")),
            })
        # httpres.set_cookie('refresh_token', response.json().get('refresh_token'), httponly=True, secure=True)
        print("REFRESHED!!!!!")
        print(refresh_token)
        return httpres
    else:
        print(response.json())
        return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    url = os.getenv('REVOKE_TOKEN_URL')
    client_id = os.getenv('AUTHENTICATOR_ID')
    client_secret = os.getenv('AUTHENTICATOR_SECRET')

    access_token = request.data.get('access_token')
    print(access_token)
    data = {
        "token": access_token,
        "client_id":client_id,
        "client_secret":client_secret
    } 

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(url, headers=headers, data=data)
    
    if response.status_code == 200:

        print("logged out")
        return Response("logged out!")
    else:
        print(response.json())
        return Response({'error': 'Invalid credentials'}, status=401)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [TokenHasReadWriteScope]


    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticatedOrReadOnly()]
        elif self.action == 'create':
            return [AllowAny()]
        else:
            return super().get_permissions()


        return Response(serializer.data)


    def list(self,request):
        queryset = User.objects.filter(username='admin')
        print(self.request.user)
        serializer = UserSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


    def perform_create(self, serializer):
        password = self.request.data['password']
        password2 = self.request.data['password2']
        if (password==password2):
            serializer.save()
            return Response('User was created')
        else:
            return Response('Password did not match')

    
    def update(self, request, *args, **kwargs):

        user = self.request.user
        instance = self.get_object()
        print(user)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(data="wrong parameters", status=400)


class SocMedViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    permission_classes = [TokenHasReadWriteScope]


    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticatedOrReadOnly()]
        elif self.action == 'create':
            return [AllowAny()]
        else:
            return super().get_permissions()

    def list(self,request):
        queryset = SocialMedia.objects.filter(user__username='admin')
        serializer = SocialMediaSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


    def update(self, request, *args, **kwargs):

        user = self.request.user
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(data="wrong parameters", status=400)


class ProjectViewSet(viewsets.ModelViewSet):
    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [TokenHasReadWriteScope]

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticatedOrReadOnly()]
        elif self.action == 'create':
            return [TokenHasReadWriteScope()]
        else:
            return super().get_permissions()


        return Response(serializer.data)

    def list(self,request):
        queryset = Project.objects.filter(user__username='admin')
        serializer = ProjectSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)


    def create(self, request):

        serializer = self.get_serializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            validated_data = serializer.validated_data
            auth_user = request.user  # Access authenticated user
            instance = Project.objects.create(user=auth_user, **validated_data)

            return Response("Project Created!", status=201)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=500)


    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response('Project was created')
        else:
            return Response('Somethin went wrong')

class BlogViewSet(viewsets.ModelViewSet):

    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [TokenHasReadWriteScope]

   
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticatedOrReadOnly()]
        elif self.action == 'create':
            return [AllowAny()]
        else:
            return super().get_permissions()


    def list(self,request):
        queryset = Blog.objects.filter(user__username='admin')
        serializer = BlogSerializer(queryset, many=True, context={'request': request})

        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
