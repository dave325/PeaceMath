# pages/views.py
from django.http import HttpResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.teal_37_stripped import getFid



def mainView(request):
  b, fig = getFid()
  b = b.tolist()
  return render(request,'index.html',{'a':fig,'b':b})

def homeView(request):
  return render(request, 'home.html')

@csrf_exempt 
def chartView(request):
  return HttpResponse('YOU HAVE HIT THE CHART POST REQUEST')



  