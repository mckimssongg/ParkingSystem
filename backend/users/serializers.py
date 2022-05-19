from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("El usuario no existe")
        self.context['user'] = user
        return data

    def create(self, validated_data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        update_user = super().update(instance, validated_data)
        update_user.set_password(validated_data['password'])
        update_user.save()
        return update_user

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['role'] = RolesSerializer(instance.role).data
        return response


class UserListSerializer(serializers.ModelSerializer):
    '''
    serializador para listar 
    '''
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'role': instance.role.name,
        }
