# pages/views.py
from django.http import HttpResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect




def mainView(request):
    template = Template("My name is {{ my_name }}.")
    return render(request,'/static_frontPage_index.html',{})