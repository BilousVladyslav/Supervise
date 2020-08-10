from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from datetime import datetime, date
import logging


# logging.basicConfig(level=logging.DEBUG)


class UserRegistrationTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.REGISTRATION_URL = '/api/register/'
        cls.user = get_user_model().objects.create(username='normal',
                                                   email='normal@user.com',
                                                   first_name='Vladyslav',
                                                   last_name='Bilous')
        cls.user.set_password('foo')
        cls.user.save()

    def test_correct_data(self):
        c = Client()
        registration_data = {
            'username': 'register',
            'password': 'fooBaR12',
            'confirm_password': 'fooBaR12',
            'email': 'register@register.com',
            'first_name': 'Emily',
            'last_name': 'Jason'
        }
        response = c.post(self.REGISTRATION_URL, registration_data, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_exist_email(self):
        c = Client()
        registration_data = {
            'username': 'register1',
            'password': 'fooBaR12',
            'confirm_password': 'fooBaR12',
            'email': 'normal@user.com',
            'first_name': 'Emily',
            'last_name': 'Jason'
        }

        response = c.post(self.REGISTRATION_URL, registration_data, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['email'], ["Email already exist."])

    def test_exist_username(self):
        c = Client()
        registration_data = {
            'username': 'normal',
            'password': 'fooBaR12',
            'confirm_password': 'fooBaR12',
            'email': 'not.exists1@register.com',
            'first_name': 'Emily',
            'last_name': 'Jason'
        }

        response = c.post(self.REGISTRATION_URL, registration_data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['username'], ["A user with that username already exists."])


class UserAuthTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.AUTH_URL = '/api/auth/'

        cls.user = get_user_model().objects.create(username='normal',
                                                   email='normal@user.com',
                                                   first_name='Vladyslav',
                                                   last_name='Bilous')
        cls.user.set_password('foo')
        cls.user.save()

    def test_correct_credentials(self):
        c = self.client
        response = c.post(self.AUTH_URL, {'username': 'normal', 'password': 'foo'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_incorrect_credentials(self):
        c = self.client
        response = c.post(self.AUTH_URL, {'username': 'normal', 'password': 'bar'}, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['non_field_errors'], ["Unable to log in with provided credentials."])

    def test_partial_credentials(self):
        c = self.client
        empty_response = c.post(self.AUTH_URL, {}, content_type='application/json')
        self.assertEqual(empty_response.status_code, 400)
        self.assertEqual(empty_response.json()['username'], ["This field is required."])
        self.assertEqual(empty_response.json()['password'], ["This field is required."])

        response_without_username = c.post(self.AUTH_URL, {'password': 'foo'}, content_type='application/json')
        self.assertEqual(response_without_username.status_code, 400)
        self.assertEqual(response_without_username.json()['username'], ["This field is required."])

        response_without_password = c.post(self.AUTH_URL, {'username': 'normal'}, content_type='application/json')
        self.assertEqual(response_without_password.status_code, 400)
        self.assertEqual(response_without_password.json()['password'], ["This field is required."])


class UserProfileTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.URL = '/api/profile/'
        cls.user = get_user_model().objects.create(username='normal',
                                                   email='normal@user.com',
                                                   first_name='Vladyslav',
                                                   last_name='Bilous')
        cls.user.set_password('foo')
        cls.user.save()

    def test_get_user_profile(self):
        self.client.force_login(user=self.user)
        response = self.client.get(self.URL)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'normal')
        self.assertEqual(response.data['email'], 'normal@user.com')
        self.assertEqual(response.data['first_name'], 'Vladyslav')
        self.assertEqual(response.data['last_name'], 'Bilous')

    def test_delete_user_profile(self):
        self.client.force_login(user=self.user)
        response = self.client.delete(self.URL)
        queryset = get_user_model().objects.filter(username=self.user.username)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(queryset), 0)

    def test_correct_profile_update(self):
        self.client.force_login(user=self.user)
        data = {
            'first_name': 'Max',
            'last_name': 'Vorontsov'
        }
        response = self.client.put(self.URL, data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], 'Max')
        self.assertEqual(response.data['last_name'], 'Vorontsov')

    def test_incorrect_profile_update(self):
        self.client.force_login(user=self.user)
        data = {
            'first_name': 'Anton',
            'last_name': 'Vorontsov',
            'wrong_field': 'value',
            'is_supervisor': True
        }
        response = self.client.put(self.URL, data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], 'Anton')
        self.assertEqual(response.data['last_name'], 'Vorontsov')
