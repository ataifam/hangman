from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

app_name = 'hangman'
urlpatterns = [
    path('<str:diff>', views.View.as_view(), name='hang'),
    path('', views.hangman, name='hangman-front'),
    path("^", include(router.urls))
]