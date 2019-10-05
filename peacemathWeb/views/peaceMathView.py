# pages/views.py
from django.http import HttpResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect




def mainView(request):
    return render(request,'index.html',{})