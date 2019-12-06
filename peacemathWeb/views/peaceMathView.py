# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.template import Template
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
import hashlib


import peacemathWeb.scripts.tealclass_37_stripped as tc 
from peacemathWeb.scripts.teal_37_stripped import getVariables

import numpy
import json

from datetime import datetime
from importlib import import_module
from django.conf import settings
SessionStore = import_module(settings.SESSION_ENGINE).SessionStore
import time

@csrf_exempt
def mainViewEnterButton(request):
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
        initialParamValue = "8"

    if request.method == "POST":
        temp = json.loads(SessionStore(session_key=request.body.decode("UTF-8"))['data'])
        for (key, value) in temp.items():
            if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
                x = numpy.asfarray(value, float)
                temp[key] = numpy.array(x)
        graph, data = tc.recalculateEnter(temp)
        for (key, value) in data.items():
            if type(value) is numpy.ndarray:
                data[key] = value.tolist()
        s = SessionStore(session_key=request.body.decode("UTF-8"))
        s['data'] = json.dumps(data)
        s.save()
        return JsonResponse({'graph':graph, 'data': data['b']})

def mainView(request):
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
        initialParamValue = "8"

    box_graph, box_colors, data,labels = getFig(request,initialParamValue)

    for (key, value) in data.items():
        if type(value) is numpy.ndarray:
            print("array: " + key)
            data[key] = value.tolist()
  

    inputValues = data['b']
    start = time.time()
    s = SessionStore()
    s['data'] = json.dumps(data)
    s.create()
    s1 = SessionStore(session_key=s.session_key)
    print(time.time() - start)
    # decoded json object now
    response = render(request, 'index.html', {
        'box_graph': box_graph,
        'box_colors': box_colors,
        'initialParamValue': initialParamValue,
        'inputValues': inputValues,
        'session_key': s.session_key,
        'inputFields': labels
    })
    return response


@csrf_exempt
def chartView(request):
    if request.method == "POST":
        temp = json.loads(SessionStore(session_key=request.body.decode("UTF-8"))['data'])
        for (key, value) in temp.items():
            if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
                x = numpy.asfarray(value, float)
                temp[key] = numpy.array(x)
        chart, graph, data = getChart(request, temp)
        for (key, value) in data.items():
            if type(value) is numpy.ndarray:
                data[key] = value.tolist()
        s = SessionStore(session_key=request.body.decode("UTF-8"))
        s['data'] = json.dumps(data)
        s.save()
        return JsonResponse({'chart': chart, 'graph':graph, 'data': data['b']})


def sendInitialParameterValue(request):
    if request.method == "POST":
        if 'initialParamValue' in request.POST:
            request.session['initialParamValue'] = str(
                request.POST['initialParamValue'])
        return redirect('/physics/')
    return HttpResponseNotFound('Wrong hitpoint')


def getFig(request,initialParamValue):
    zzz = App(initialParamValue)
    box, box_colors,labels = zzz.createBoxGraph()
    return (box, box_colors, getVariables(initialParamValue),labels)


def getChart(request, data):
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
        initialParamValue = "8"
    zzz = App(initialParamValue)
    box = zzz.recalculate(data)
    return (box)
