from rest_framework import viewsets, authentication, permissions, status
from rest_framework.response import Response

from base.models import Book, Image
from base.serializers import ImageSerializer
from .serializers import BookSerializer


class ImageViewSet(viewsets.ModelViewSet):
    """Manage images in database"""
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_class = None

    def get_queryset(self):
        qs = self.queryset.filter(uploader=self.request.user).order_by('-id')
        return qs

    def create(self, request):
        resp = super().create(request)
        book = self.queryset.get(id=resp.data["id"])  # add book to user
        self.request.user.books.add(book)
        return resp
