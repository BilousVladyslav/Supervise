from rest_framework.routers import DefaultRouter
from .views import WorkObjectsViewSet, AreasViewSet, AreasForDroneViewSet


router = DefaultRouter()
router.register(r'^api/workplaces', WorkObjectsViewSet, basename='workplace')
router.register(r'^api/areas', AreasViewSet, basename='area')
router.register(r'^api/drone/areas', AreasForDroneViewSet, basename='area')


workplaces_urlpatterns = router.urls
