from django.contrib import admin
from django.urls import path

from user_profile.urls import profile_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += profile_urlpatterns
