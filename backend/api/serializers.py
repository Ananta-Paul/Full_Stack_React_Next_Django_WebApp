from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Watch
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class WatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watch
        fields = ["id", "symbol", "content", "user", "created_at"]
        extra_kwargs = {"user": {"read_only": True}}



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

