# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.teal_37_stripped import getFig, getChart
import json



def mainView(request):
  box_graph,box_colors = getFig()
  return render(request,'index.html',{'box_graph':box_graph,'box_colors':box_colors})

@csrf_exempt 
def chartView(request):
  if request.method == "POST":
    message = 'You have hit the chart post request'
    return HttpResponse(getChart())
  return render(request,'chart.html',{'box_graph':getChart()})

@csrf_exempt 
def sendInitialParameterValue(request):
  if request.method == "POST":
    body = json.loads(request.body.decode('utf-8'))
    value = body.get('value')
    return HttpResponse(f'Value sent was {value}')
  return HttpResponseNotFound('Wrong hitpoint')

# Side Bar Buttons
@csrf_exempt 
def setInitialConditions(request):
  if request.method == "POST":
    data = json.loads(request.body)["values"]
    return HttpResponse('Success')
  return HttpResponseNotFound('Wrong hitpoint')


  