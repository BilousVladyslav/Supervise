from django.conf.urls import url

from rest_framework.authtoken import views

from .views import UserProfile, GetUsersList, UserRegistration

profile_urlpatterns = [

    url(r'^api/register/', UserRegistration.as_view()),

    url(r'^api/profile/$', UserProfile.as_view()),

    url(r'^api/profiles/$', GetUsersList.as_view()),

    url(r'^api/auth/', views.obtain_auth_token)
]
