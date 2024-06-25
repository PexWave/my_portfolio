from oauth2_provider.models import RefreshToken
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from django.core.mail import send_mail

from .models import SocialMedia, Blog, Project
from django.contrib.auth.models import Group
from rest_framework import permissions, viewsets
from rest_framework.permissions import AllowAny
from django.http import FileResponse    
from rest_framework.decorators import action, api_view, permission_classes
from .serializers import *
from .pagination import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.db import transaction
from django.conf import settings
from requests.auth import HTTPBasicAuth
from django_sendfile import sendfile
import requests
import base64
import smtplib
from django.conf import settings

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    url = settings.TOKEN_URL


    client_id = settings.AUTHENTICATOR_ID
    client_secret = settings.AUTHENTICATOR_SECRET
    print(url)
    data = {
        'grant_type': 'password',
        'username': username,
        'password': password,
    }

    auth = HTTPBasicAuth(client_id, client_secret)

    response = requests.post(url, data=data, auth=auth)
    print(response)

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

    url = settings.TOKEN_URL
    client_id = settings.AUTHENTICATOR_ID
    client_secret = settings.AUTHENTICATOR_SECRET

    refresh_token = request.COOKIES.get('refresh_token')
    

    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id":client_id,
        "client_secret":client_secret
    } 

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(url, headers=headers, data=data, verify=False)

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
    url = settings.REVOKE_TOKEN_URL
    client_id = settings.AUTHENTICATOR_ID
    client_secret = settings.AUTHENTICATOR_SECRET

    access_token = request.data.get('access_token')
    print(access_token)
    data = {
        "token": access_token,
        "client_id":client_id,
        "client_secret":client_secret
    } 

    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(url, headers=headers, data=data, verify=False)
    
    if response.status_code == 200:

        print("logged out")
        return Response("logged out!")
    else:
        print(response.json())
        return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
@permission_classes([AllowAny])
def download_resume(request):
    user = User.objects.get(username="admin")
    print(user.resume.url)
    return FileResponse(open(user.resume.url, 'rb'), as_attachment=True)

@api_view(['POST'])
@permission_classes([AllowAny])
def send_email(request):
    serializer = EmailSerializer(data=request.POST)
    serializer.is_valid()
    print(request.POST)

    try:

        if serializer.is_valid(raise_exception=True):
            subject = serializer.validated_data['subject']
            name = serializer.validated_data['name']
            message = serializer.validated_data['message']

            # Construct the email message using string formatting
            email_body = f"{name}\n\n{message}"  # Clearer line break

            # Send the email
            send_mail(
                subject,
                email_body,
                serializer.validated_data['email'],
                ["asakilsarhan@gmail.com"],
                fail_silently=False
            )
    except smtplib.SMTPException as e:
        print(e)
        return Response(data="Something went wrong", status=500)

    return Response(data="message sent!", status=200)


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
        print(user)
        instance = self.get_object()
        print(request.data)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        else:
            print(serializer.errors)
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
        print(instance)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(data="wrong parameters", status=400)


class ProjectViewSet(viewsets.ModelViewSet):
    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [TokenHasReadWriteScope]
    pagination_class = CustomPagination


    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticatedOrReadOnly()]
        elif self.action == 'create':
            return [TokenHasReadWriteScope()]
        else:
            return super().get_permissions()


    def list(self,request):
        queryset = Project.objects.filter(user__username='admin').order_by('id')  # Order by a field like 'id'
        page = self.paginate_queryset(queryset)
        serializer = ProjectSerializer(page, many=True, context={'request': request})
        

        return self.get_paginated_response(serializer.data)

    def update(self, request, *args, **kwargs):

        user = self.request.user
        instance = self.get_object()
        print(instance)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(data="wrong parameters", status=400)

        
    def create(self, request):

        serializer = self.get_serializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            validated_data = serializer.validated_data
            print(validated_data)
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
