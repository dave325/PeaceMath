# pages/views.py
from django.http import HttpResponse


def mainView(request):
    return HttpResponse('Hello, World!')