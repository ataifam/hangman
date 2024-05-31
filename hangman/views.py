from rest_framework import views
from rest_framework.response import Response
import random
from django.shortcuts import render, redirect
import os
from django.templatetags.static import static
import requests
from rest_framework.decorators import api_view

words = {}

def hangman(request):
    return render(request, 'hangman/index.html', {})

@api_view()
def play(request, wordLength):
    return Response({"word": getWord(wordLength)})

def getWord(wordLength):
    if wordLength > 1 and wordLength < 11:
        # if words dict is empty, instantiate it
        if not words:
            setWordsList()
        return random.choice(words[wordLength])
    
"""set up words dictionary with word length as key and word as value"""
def setWordsList():
    # get words list
    url = static('hangman/words.txt')
    response = requests.get(url)
    # list in str object form
    temp_list = response.content.decode('utf-8').splitlines()

    # store word length keys and word vals in top level dict
    for i in temp_list:
        words.setdefault(len(i), []).append(i)