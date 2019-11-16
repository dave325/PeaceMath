# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.PeaceMathAPI import getFig, getChart
import numpy
import json


def mainView(request):
  if 'initialParamValue' in request.session:
    initialParamValue = request.session['initialParamValue']
  else:
    request.session['initialParamValue'] = "8"
    initialParamValue = "8"

  box_graph,box_colors, data = getFig(initialParamValue)

  for (key,value) in data.items():
    if type(value) is numpy.ndarray :
          print("array: " + key)
          data[key] = value.tolist()

  if 'inputValues' in request.session:
    inputValues = request.session['inputValues']
  else:
    inputValues = revertBackToInitial()

  return render(request,'index.html',{
    'box_graph':box_graph,
    'box_colors':box_colors,
    'initialParamValue': initialParamValue,
    'inputValues': inputValues,
    'dataValues': json.dumps(data)
  })

@csrf_exempt
def chartView(request):
  if request.method == "POST":
    print("Durig request")
    temp = json.loads(request.body)
    for (key,value) in temp.items():
      if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
        x = numpy.asfarray(value, float)
        temp[key] = numpy.array(x)
    chart, data = getChart(request.session['initialParamValue'], temp)
    for (key,value) in data.items():
      if type(value) is numpy.ndarray :
        data[key] = value.tolist()
    return JsonResponse({'chart':chart, 'data':data})

def sendInitialParameterValue(request):
  if request.method == "POST":
    if 'initialParamValue' in request.POST:
      request.session['initialParamValue'] = str(request.POST['initialParamValue'])
    return redirect('/physics/')
  return HttpResponseNotFound('Wrong hitpoint')

def sideBarButtonActions(request):
  # CSRF Token can be accessed in request.POST['csrfmiddlewaretoken]
  if request.method == "POST":
    if 'initial_conditions' in request.POST:
      request.session['inputValues'] = revertBackToInitial()
    if 'original' in request.POST:
      request.session['inputValues'] = setInputValues(request)
    if 'enter' in request.POST:
      request.session['inputValues'] = setInputValues(request)
    return redirect('/physics/')
  return HttpResponseNotFound('Wrong hitpoint')


# Sets the values back to the initial coniditions of all 1.0
def revertBackToInitial():
  return {
    'subMem' : 1.0,
    'addMem' : 1.0,
    'addExpect' : 1.0,
    'subExpect' : 1.0,
    'pIR' : 1.0,
    'nIR' : 1.0  
  }

# Sets the values to the defined values in the request.POST from the Form
def setInputValues(request):
  return {
    'subMem' : request.POST['sub_mem'],
    'addMem' : request.POST['add_mem'],
    'addExpect' : request.POST['add_expect'],
    'subExpect' : request.POST['sub_expect'],
    'pIR' : request.POST['pir'],
    'nIR' : request.POST['nir']  
  }
  
  