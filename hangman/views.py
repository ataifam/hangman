from rest_framework import views
from .serializers import Serializer
from rest_framework.response import Response
import random
from django.shortcuts import render, redirect
import os
from django.templatetags.static import static
import requests

url = static('hangman/words.txt')
response = requests.get(url)
temp_list = response.content.decode('utf-8').splitlines()

# take O(n) cost now by organizing words into lists of same length to avoid
# doing it for every single new game later 
words = {}
for i in temp_list:
    words.setdefault(len(i), []).append(i)


def hangman(request):
    return render(request, 'hangman/index.html', {})

class View(views.APIView):

    def get(self, request, wordLength):
        yourdata= [{"word": getWord(self.kwargs.get('wordLength', None))}]
        results = Serializer(yourdata, many=True).data
        return Response(results)

def getWord(wordLength):
    if wordLength > 1 and wordLength < 11:
        return random.choice(words[wordLength])