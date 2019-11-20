# pages/views.py
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.template import Template
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
import hashlib

# from peacemathWeb.scripts.PeaceMathAPI import getFig, getChart

from peacemathWeb.scripts.tealclass_37_stripped import *
from peacemathWeb.scripts.teal_37_stripped import getVariables

import numpy
import json

from datetime import datetime
from importlib import import_module
from django.conf import settings
SessionStore = import_module(settings.SESSION_ENGINE).SessionStore

def mainView(request):
    if 'initialParamValue' in request.session:
        initialParamValue = int(request.session['initialParamValue'])
    else:
        initialParamValue = "8"

    box_graph, box_colors, data = getFig(request)

    for (key, value) in data.items():
        if type(value) is numpy.ndarray:
            print("array: " + key)
            data[key] = value.tolist()

    if 'inputValues' in request.session:
        inputValues = request.session['inputValues']
    else:
        inputValues = revertBackToInitial()
    s = SessionStore()
    s['data'] = json.dumps(data)
    s.create()
    s1 = SessionStore(session_key=s.session_key)

    # decoded json object now
    response = render(request, 'index.html', {
        'box_graph': box_graph,
        'box_colors': box_colors,
        'initialParamValue': initialParamValue,
        'inputValues': inputValues,
        'session_key': s.session_key
    })
    return response


@csrf_exempt
def chartView(request):
    if request.method == "POST":
        print("during chart call")
        temp = json.loads(SessionStore(session_key=request.body.decode("UTF-8"))['data'])
        for (key, value) in temp.items():
            if key == "ca" or key == "ma" or key == "ba" or key == "ica" or key == "z" or key == "a" or key == "b":
                x = numpy.asfarray(value, float)
                temp[key] = numpy.array(x)
        chart, data = getChart(request, temp)
        for (key, value) in data.items():
            if type(value) is numpy.ndarray:
                data[key] = value.tolist()
        s = SessionStore(session_key=request.body.decode("UTF-8"))
        s['data'] = json.dumps(data)
        s.save()
        return JsonResponse({'chart': chart, 'data': data})


def sendInitialParameterValue(request):
    if request.method == "POST":
        if 'initialParamValue' in request.POST:
            request.session['initialParamValue'] = str(
                request.POST['initialParamValue'])
        return redirect('/physics/')
    return HttpResponseNotFound('Wrong hitpoint')


def sideBarButtonActions(request):
    # CSRF Token can be accessed in request.POST['csrfmiddlewaretoken]
    if request.method == "POST":
        if 'original' in request.POST:
            request.session['inputValues'] = revertBackToInitial()
        if 'enter' in request.POST:
            request.session['inputValues'] = setInputValues(request)
        return redirect('/physics/')
    return HttpResponseNotFound('Wrong hitpoint')


# Sets the values back to the initial coniditions of all 1.0
def revertBackToInitial():
    return {
        'subMem': 1.0,
        'addMem': 1.0,
        'addExpect': 1.0,
        'subExpect': 1.0,
        'pIR': 1.0,
        'nIR': 1.0
    }

# Sets the values to the defined values in the request.POST from the Form


def setInputValues(request):
    return {
        'subMem': request.POST['sub_mem'],
        'addMem': request.POST['add_mem'],
        'addExpect': request.POST['add_expect'],
        'subExpect': request.POST['sub_expect'],
        'pIR': request.POST['pir'],
        'nIR': request.POST['nir']
    }


def getFig(request):
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
        request.session['initialParamValue'] = "8"
        initialParamValue = "8"
    # WILL FIX THIS LATER TO ALLOW FOR ONE INSTANCE OF APP
    zzz = App(initialParamValue)
    box, box_colors = zzz.createBoxGraph()
    return (box, box_colors, getVariables(initialParamValue))


def getChart(request, data):
    if 'initialParamValue' in request.session:
        initialParamValue = str(request.session['initialParamValue'])
    else:
        initialParamValue = "8"
    # WILL FIX THIS LATER TO ALLOW FOR ONE INSTANCE OF APP
    zzz = App(initialParamValue)
    box = zzz.recalculate(data)
    return (box)
