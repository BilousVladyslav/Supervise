from django.db.models import F

from rest_framework import mixins
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication

from . import serializers
from .models import WorkObject, Area


class WorkObjectsViewSet(GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication, TokenAuthentication]
    serializer_class = serializers.WorkObjectSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return WorkObject.objects.filter(supervisor=self.request.user)

    def get_serializer_context(self):
        return {'user': self.request.user}


class AreasViewSet(GenericViewSet,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication, TokenAuthentication]
    serializer_class = serializers.AreaSerializer
    filter_backends = [SearchFilter]
    search_fields = ['location']

    def get_queryset(self):
        return Area.objects.filter(location__supervisor=self.request.user)\
            .order_by(F('working_now') - F('workers_count'))


class AreasForDroneViewSet(GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin):
    serializer_class = serializers.AreaSerializerForDrone
    queryset = Area.objects.all()
