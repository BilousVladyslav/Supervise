from rest_framework.filters import SearchFilter
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, \
    ListModelMixin, CreateModelMixin

from django.contrib.auth import get_user_model

from .serializers import UserProfileSerializer, UsersSerializer, RegisterUserSerializer


class UserRegistration(GenericAPIView, CreateModelMixin):
    serializer_class = RegisterUserSerializer

    def post(self, request):
        return self.create(request)


class UserProfile(GenericAPIView, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication, TokenAuthentication]
    serializer_class = UserProfileSerializer
    queryset = get_user_model().objects.all()

    def get_object(self):
        return self.request.user

    def get(self, request):
        return self.retrieve(request)

    def put(self, request):
        return self.partial_update(request)

    def delete(self, request):
        return self.destroy(request)


class GetUsersList(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication, TokenAuthentication]
    serializer_class = UsersSerializer
    queryset = get_user_model().objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['^username', '^first_name', '^last_name']
