from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'groups', views.GroupViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('login/', views.login),
    path('logout/', views.logout),
    path('refresh/', views.refresh_token),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),

]

urlpatterns += router.urls