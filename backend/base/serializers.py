from django.contrib.auth import get_user_model
from rest_framework import serializers

from base.models import Image, User, Book


# Custom fields

class SetImageField(serializers.Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, value):
        return value

    def to_internal_value(self, value):
        return value


#  Model serializers

class ImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to benefit"""

    class Meta:
        model = Image
        fields = ('id', 'image',)


class BaseBookSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=False, read_only=True)
    image_id = SetImageField(write_only=True)

    class Meta:
        model = Book
        fields = ('id', 'author', 'title', 'description', 'image', 'image_id')


class BaseUserSerializer(serializers.ModelSerializer):
    books = BaseBookSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'first_name', 'last_name', 'books')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password is not None:
            user.set_password(password)
            user.save()

        return user
