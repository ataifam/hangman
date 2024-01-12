from rest_framework import serializers

class Serializer(serializers.Serializer):
   """Your data serializer, define your fields here."""
   word = serializers.CharField(max_length=10)