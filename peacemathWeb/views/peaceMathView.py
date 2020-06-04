# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.template import Template
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
import hashlib
from django.views.decorators.clickjacking import xframe_options_exempt


import peacemathWeb.scripts.tealclass_37_stripped as tc 
from peacemathWeb.scripts.teal_37_stripped import getVariables


import numpy
import json

from datetime import datetime
from importlib import import_module
from django.conf import settings 

SessionStore = import_module(settings.SESSION_ENGINE).SessionStore
import time


@xframe_options_exempt
@csrf_exempt
def mainViewEnterButton(request):

    #contains body.key,body.b_vals

    body = json.loads(request.body)

    '''
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
    '''
    initialParamValue = "111"

    if request.method == "POST":
        temp = json.loads(SessionStore(session_key=body['key'])['data'])
        temp["b"] = body["b_vals"]
        for (key, value) in temp.items():
            if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
                x = numpy.asfarray(value, float)
                temp[key] = numpy.array(x)
        
        #box_graph, box_colors, data,labels = getFig(request,initialParamValue)
        #graph, data = tc.recalculateEnter(temp)


        graph,data = getEnterButtonFig(initialParamValue,temp)



        for (key, value) in data.items():
            if type(value) is numpy.ndarray:
                data[key] = value.tolist()
        s = SessionStore(session_key=body['key'])
        s['data'] = json.dumps(data)
        s.save()
    return JsonResponse({ 'graph':graph, 'data': data['b']})

@xframe_options_exempt
def mainView(request):
    '''
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
    '''
    initialParamValue = "111"

    box_graph, box_colors, data,labels = getFig(initialParamValue)

    for (key, value) in data.items():
        if type(value) is numpy.ndarray:
            data[key] = value.tolist()
  

    inputValues = data['b']
    start = time.time()
    s = SessionStore()
    s['data'] = json.dumps(data)
    s.create()
    s1 = SessionStore(session_key=s.session_key)
    # decoded json object now
    response = render(request, 'index.html', {
        'select_options': ['8','105','111','202'],
        'box_graph': box_graph,
        'box_colors': box_colors,
        'initialParamValue': initialParamValue,
        'inputValues': inputValues,
        'session_key': s.session_key,
        'inputFields': labels
    })
    return response

@csrf_exempt
@xframe_options_exempt
def btnClick(request):
    temp = json.loads(request.body)
    s = json.loads(SessionStore(session_key=temp['key'])['data'])
    for (key, value) in s.items():
        if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
            x = numpy.asfarray(value, float)
            s[key] = numpy.array(x)
    arr,graph = getValuesByLabels(s, temp['val'])
    return JsonResponse({"temp": arr, 'graph':graph }) 

@csrf_exempt
@xframe_options_exempt
def chartView(request):
    if request.method == "POST":
        body = json.loads(request.body)
        
        temp = json.loads(SessionStore(session_key=body['key'])['data'])
        temp["b"] = body["b_vals"]
        for (key, value) in temp.items():
            if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
                x = numpy.asfarray(value, float)
                temp[key] = numpy.array(x)
        chart, graph, data = getChart(request, temp)
        for (key, value) in data.items():
            if type(value) is numpy.ndarray:
                data[key] = value.tolist()
        s = SessionStore(session_key=body['key'])
        s['data'] = json.dumps(data)
        s.save()
        return JsonResponse({'chart': chart, 'graph':graph, 'data': data['b']})


@xframe_options_exempt
def sendInitialParameterValue(request):
    if request.method == "POST":
        if 'initialParamValue' in request.POST:
            request.session['initialParamValue'] = str(
                request.POST['initialParamValue'])
        return redirect('/')
    return HttpResponseNotFound('Wrong hitpoint')
@xframe_options_exempt
def getValuesByLabels(data,id):
    zzz = tc.App(data)
    arr,graph = zzz.btn_on_click(id,data)
    return (arr,graph)

@xframe_options_exempt
def getEnterButtonFig(initialParamValue,data):
    zzz = tc.App(initialParamValue)
    return zzz.recalculateEnter(data),data

@xframe_options_exempt
def getFig(initialParamValue):
    zzz = tc.App(initialParamValue)
    box, box_colors,labels = zzz.createBoxGraph()
    return (box, box_colors, getVariables(initialParamValue),labels)

@xframe_options_exempt
def getChart(request, data):
    initialParamValue = "111"
    zzz = tc.App(initialParamValue)
    box = zzz.recalculate(data)
    return (box)