from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from django.contrib.auth import get_user_model

from .models import WorkObject, Area


class WorkObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkObject
        exclude = ['supervisor']

    def create(self, validated_data):
        user = self.context['user']
        work_object = WorkObject.objects.create(supervisor=user, **validated_data)
        return work_object


class AreaSerializer(serializers.ModelSerializer):
    location = WorkObjectSerializer()

    class Meta:
        model = Area
        fields = '__all__'
        read_only_fields = ['working_now']


class SlugRelatedLocationField(serializers.SlugRelatedField):

    def get_queryset(self):
        return WorkObject.objects.filter(supervisor=self.context['user'])


class CreateAreaSerializer(serializers.ModelSerializer):
    location = SlugRelatedLocationField('id')

    class Meta:
        model = Area
        fields = ['title', 'description', 'workers_count', 'location']


class EditAreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = ['title', 'description', 'workers_count']


class AreaSerializerForDrone(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = ['id', 'workers_count', 'working_now']
        read_only_fields = ['workers_count']
