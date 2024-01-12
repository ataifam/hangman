from rest_framework import views
from .serializers import Serializer
from rest_framework.response import Response
import nltk
nltk.download('words')
from nltk.corpus import words
import random
from django.shortcuts import render, redirect

easy_list = []
hard_list = []

# initialize lists with words
# easy list contains words with <= 6 letters
# hard list contains words with 7-10 letters
for w in words.words():
    if w.isalpha():
        if len(w) <= 6:
            easy_list.append(w.lower())
        elif len(w) <= 10:
            hard_list.append(w.lower())

def hangman(request):
    return render(request, 'hangman/index.html', {})

class View(views.APIView):

    def get(self, request, diff):
        yourdata= [{"word": getWord(self.kwargs.get('diff', None))}]
        results = Serializer(yourdata, many=True).data
        return Response(results)

def getWord(difficulty):
    # if argument 'E' was appended to the request, randomly select a easy word
    if difficulty == 'E':
        return random.choice(easy_list)
    # anything else send a hard word to api
    return random.choice(hard_list)