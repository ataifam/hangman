from rest_framework import views
from .serializers import Serializer
from rest_framework.response import Response
import nltk
nltk.download('words')
from nltk.corpus import words
import random
from django.shortcuts import render, redirect

def hangman(request):
    return render(request, 'hangman/index.html', {})

class View(views.APIView):

    def get(self, request, wordLength):
        yourdata= [{"word": getWord(self.kwargs.get('wordLength', None))}]
        results = Serializer(yourdata, many=True).data
        return Response(results)

def getWord(wordLength):
    if wordLength > 1 and wordLength < 11:
        # initialize lists with words
        # easy list contains words with <= 6 letters
        # hard list contains words with 7-10 letters

        word_list = [ w.lower() for w in words.words() if w.isalpha() and len(w) == wordLength ]
        return random.choice(word_list)