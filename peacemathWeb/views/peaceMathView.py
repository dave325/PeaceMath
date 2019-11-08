# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.PeaceMathAPI import getFig, getChart
import numpy
import json
def mainView(request):
  box_graph,box_colors, data = getFig()
  print("before loop")
  for (key,value) in data.items():
    if type(value) is numpy.ndarray :
          print("array: " + key)
          data[key] = numpy.array(value).tolist()
  print('after loop')
  if 'initialParamValue' in request.session:
    initialParamValue = request.session['initialParamValue']
  else:
    print('Setting to default value of 8')
    request.session['initialParamValue'] = 8
    initialParamValue = 8
  if 'inputValues' in request.session:
    inputValues = request.session['inputValues']
  else:
    inputValues = revertBackToInitialConditions()
    request.session['inputValues'] = inputValues
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
      if type(value) is list :
            temp[key] = numpy.array(value)
    chart, data = getChart(temp)
    for (key,value) in data.items():
      if type(value) is numpy.ndarray :
            data[key] = numpy.array(value).tolist()
    return JsonResponse({'chart':chart, 'data':data})

'''
  This method sets the input values of either:
    8, 105, 111, or 202
    (Default value is 8)
'''
def sendInitialParameterValue(request):
  if request.method == "POST":
    print('Setting initialParamValue in session ...')
    if 'initialParamValue' in request.POST:
      request.session['initialParamValue'] = int(request.POST['initialParamValue'])
    return redirect('/physics/')
  return HttpResponseNotFound('Wrong hitpoint')

'''
  This function handles all the sidebar button clicks of Original, Enter, and Inital Conditions 
  and sets the input values in inputValues depending on what is passed in from the form.

  Hitting the Initial Condition button will reset the all the input values to 1.0

  It will redirect the reponse back to /physics
'''
def sideBarButtonActions(request):
  # CSRF Token can be accessed in request.POST['csrfmiddlewaretoken]
  if request.method == "POST":
    if 'initial_conditions' in request.POST:
      print('Setting to INITIAL CONDITIONS ...')
      request.session['inputValues'] = revertBackToInitialConditions()
    if 'original' in request.POST:
      print('Setting to ORIGINAL ...')
      request.session['inputValues'] = setInputValues(request)
    if 'enter' in request.POST:
      print('Setting to ENTER ...')
      request.session['inputValues'] = setInputValues(request)
    return redirect('/physics/')
  return HttpResponseNotFound('Wrong hitpoint')

def setInputValues(request):
  inputs = {
    'subMem' : request.POST['sub_mem'],
    'addMem' : request.POST['add_mem'],
    'addExpect' : request.POST['add_expect'],
    'subExpect' : request.POST['sub_expect'],
    'pIR' : request.POST['pir'],
    'nIR' : request.POST['nir']  
  }
  return inputs

'''
  This function resets all six inputValues back to its initial state of 1.0
'''
def revertBackToInitialConditions():
  inputs = {
    'subMem' : 1.0,
    'addMem' : 1.0,
    'addExpect' : 1.0,
    'subExpect' : 1.0,
    'pIR' : 1.0,
    'nIR' : 1.0  
  }
  return inputs

  
  
  
  
  
  


  