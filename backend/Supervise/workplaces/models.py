from django.db import models
from django.contrib.auth import get_user_model


class WorkObject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=False, max_length=150)
    address = models.CharField(blank=False, max_length=250)
    supervisor = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='work_objects')


class Area(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(blank=False, max_length=150)
    description = models.TextField(blank=False)
    location = models.ForeignKey(WorkObject, on_delete=models.CASCADE, related_name='areas')
    workers_count = models.IntegerField(blank=False, default=0)
    working_now = models.IntegerField(blank=False, default=0)
