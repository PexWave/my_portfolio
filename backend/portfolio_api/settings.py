"""
Django settings for portfolio_api project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os

from dotenv import dotenv_values
config = dotenv_values(".env")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = config['DEBUG']
SECRET_KEY = config['SECRET_KEY']
OIDC_RSA_PRIVATE_KEY = config['OIDC_RSA_PRIVATE_KEY']
TOKEN_URL = config['TOKEN_URL']
REVOKE_TOKEN_URL = config['REVOKE_TOKEN_URL']
CLIENT_ID = config['CLIENT_ID']
CLIENT_SECRET = config['CLIENT_SECRET']
AUTHENTICATOR_ID = config['AUTHENTICATOR_ID']
AUTHENTICATOR_SECRET = config['AUTHENTICATOR_SECRET']




# 'DJANGO_ALLOWED_HOSTS' should be a single string of hosts with a space between each.
# For example: 'DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]'
ALLOWED_HOSTS = config['DJANGO_ALLOWED_HOSTS'].split(" ")

CORS_ORIGIN_ALLOW_ALL = True   
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_ALLOW = True
CORS_ALLOWED_ORIGINS = [    
'https://my-portfolio-i1xukfzic-pexwaves-projects.vercel.app',
    'https://3029-58-69-90-10.ngrok-free.app'

]

CORS_ALLOW_HEADERS = ('content-disposition', 'accept-encoding',
                      'content-type', 'accept', 'origin', 'authorization', 'access-control-allow-origin', 'ngrok-skip-browser-warning')

# CORS_ORIGIN_WHITELIST = (
#     'https://my-portfolio-delta-seven-35.vercel.app',

#     'https://my-portfolio-b6dzgp5o9-pexwaves-projects.vercel.app',
#     'https://3029-58-69-90-10.ngrok-free.app'
# )

# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

CSRF_TRUSTED_ORIGINS =[    
    'https://my-portfolio-i1xukfzic-pexwaves-projects.vercel.app',
    'https://3029-58-69-90-10.ngrok-free.app'

]



# Application definition

INSTALLED_APPS = [
     'corsheaders',
     'django_sendfile',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'oauth2_provider',
    'api',
        'storages',

]

MIDDLEWARE = [
     "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'oauth2_provider.middleware.OAuth2TokenMiddleware',
    ]

ROOT_URLCONF = 'portfolio_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

OAUTH2_PROVIDER = {
    "OIDC_ENABLED": True,
    "OIDC_RSA_PRIVATE_KEY": config["OIDC_RSA_PRIVATE_KEY"],
    "SCOPES": {
        "openid": "OpenID Connect scope",
        'read': 'Read scope',
         'write': 'Write scope',
        # ... any other scopes that you use
    },

        # Enable and configure RP-Initiated Logout
    "OIDC_RP_INITIATED_LOGOUT_ENABLED": True,
    "OIDC_RP_INITIATED_LOGOUT_ALWAYS_PROMPT": True,
    "ACCESS_TOKEN_EXPIRE_SECONDS": 36000,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 36000,
    "ROTATE_REFRESH_TOKEN": False
    # ... any other settings you want
}

AUTHENTICATION_BACKENDS = [
    'oauth2_provider.backends.OAuth2Backend',
    # Uncomment following if you want to access the admin
    'django.contrib.auth.backends.ModelBackend',

]

WSGI_APPLICATION = 'portfolio_api.wsgi.application'

AUTH_USER_MODEL='api.User'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.sqlite3',
        "NAME": os.environ.get("SQL_DATABASE", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}
REST_FRAMEWORK = {

    'DEFAULT_AUTHENTICATION_CLASSES': (
    'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    ),

    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',


}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




JWT_SIGNING_KEY = os.environ.get('JWT_SIGNING_KEY')
JWT_SIGNING_KEY = os.environ.get('JWT_SIGNING_KEY')

AWS_ACCESS_KEY_ID = os.getenviron.get('AWS_ACCESS_KEY_ID')
AWS_ACCESS_KEY_ID = os.getenviron.get('AWS_ACCESS_KEY_ID')

AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')

AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com'

AWS_DEFAULT_ACL = os.environ.get('AWS_DEFAULT_ACL')
AWS_DEFAULT_ACL = os.environ.get('AWS_DEFAULT_ACL')

AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400'
}

AWS_LOCATION = 'media'

AWS_QUERYSTRING_AUTH = False

AWS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
}



DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

STATIC_FILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'   

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

STATIC_ROOT = '/static/'

STATIC_URL = '/static/'
STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SENDFILE_BACKEND = "django_sendfile.backends.simple"
SENDFILE_ROOT = os.path.join(BASE_DIR, 'media')

EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND')
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = os.environ.get('EMAIL_PORT')
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS')
EMAIL_USE_SSL = os.environ.get('EMAIL_USE_SSL')


