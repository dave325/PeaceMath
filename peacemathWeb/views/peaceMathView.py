# pages/views.py
from django.http import HttpResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.teal_37_stripped import getFig



def mainView(request):
  box_graph,box_colors = getFig()
  return render(request,'index.html',{'box_graph':box_graph,'box_colors':box_colors})

def homeView(request):
  return render(request, 'home.html')

@csrf_exempt 
def chartView(request):
  return HttpResponse('YOU HAVE HIT THE CHART POST REQUEST')



  