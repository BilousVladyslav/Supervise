from rest_framework import serializers

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

    class Meta:
        model = Area
        fields = '__all__'
        read_only_fields = ['working_now']


class AreaSerializerForDrone(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = ['id', 'workers_count', 'working_now']
        read_only_fields = ['workers_count']
