from django.urls import path, include, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

app_name = 'hangman'
urlpatterns = [
    path('<int:wordLength>', views.play, name='hang'),
    path('', views.hangman, name='hangman-front'),
    re_path(r'^', include(router.urls))
]