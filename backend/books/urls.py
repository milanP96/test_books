from django.urls import path, include
from books import views
from rest_framework.routers import DefaultRouter

app_name = 'books'
router = DefaultRouter()
router.register('book', views.BookView)
router.register('image', views.ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
