from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

from api import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'socialmedias', views.SocMedViewSet, basename='socialmedia')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'blogs', views.BlogViewSet, basename='blog')

router.register(r'groups', views.GroupViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),

    #ADMIN AND AUTH ROUTES
    path('admin/', admin.site.urls),
    path('login/', views.login),
    path('logout/', views.logout),
    path('refresh/', views.refresh_token),

    path('download-resume/', views.download_resume),
    path('send-email/', views.send_email),
    
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),

    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += router.urls