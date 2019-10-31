# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.template import Template
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from peacemathWeb.scripts.teal_37_stripped import getFig, getChart
import json


'''
The initialParamValue dictates the four values that are possible 
for the main graph in '/physics', which can be one of:
  8, 105, 111, or 202

Default value, for now, is 8
'''
initialParamValue = 8

'''
This inputValues dictionary contains all the various input values
relevant to the main GUI graph on /physics and will be rendered in 
the mainView template.

Initially, all values are set to 1.0

Any of the sidebar buttons of Original, Enter, and Inital Conditions
will directly change the relevant values in the dictonary. See more 
in the sideBarButtonActions function below.
'''
inputValues = {
  'addMem': 1.0,
  'subMem': 1.0,
  'addExpect': 1.0,
  'subExpect': 1.0,
  'pIR': 1.0,
  'nIR': 1.0
}

def mainView(request):
  box_graph,box_colors = getFig()
  return render(request,'index.html',{
    'box_graph':box_graph,
    'box_colors':box_colors,
    'initialParamValue': initialParamValue,
    'inputValues': inputValues
    })

@csrf_exempt
def chartView(request):
  if request.method == "POST":
      return HttpResponse(getChart())


# ***  KELVIN: STILL HAVE TO FIX THIS FUNCT BELOW!!!!! **** 
'''
  This method sets the input values of either:
    8, 105, 111, or 202
    (Default value is 8)
'''
def sendInitialParameterValue(request):
  if request.method == "POST":
    if 'initialParamValue' in request.POST:
      print('Setting initialParamValue ...')
      initialParamValue = int(request.POST['initialParamValue'])
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
      revertBackToInitialConditions()
    if 'original' in request.POST:
      print('Setting to ORIGINAL ...')
      setInputValues(request)
    if 'enter' in request.POST:
      print('Setting to ENTER ...')
      setInputValues(request)
    print(inputValues)
    return HttpResponseRedirect('/physics/')
  return HttpResponseNotFound('Wrong hitpoint')

def setInputValues(request):
  inputValues['addMem'] = request.POST['add_mem']
  inputValues['subMem'] = request.POST['sub_mem']
  inputValues['addExpect'] = request.POST['add_expect']
  inputValues['subExpect'] = request.POST['sub_expect']
  inputValues['pIR'] = request.POST['pir'] 
  inputValues['nIR'] = request.POST['nir'] 

'''
  This function resets all six inputValues back to its initial state of 1.0
'''
def revertBackToInitialConditions():
  inputValues['subMem'] = 1.0
  inputValues['addMem'] = 1.0
  inputValues['addExpect'] = 1.0
  inputValues['subExpect'] = 1.0
  inputValues['pIR'] = 1.0
  inputValues['nIR'] = 1.0


  