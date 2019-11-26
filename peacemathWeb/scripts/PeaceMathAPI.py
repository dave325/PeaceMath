
from peacemathWeb.scripts.tealclass_37_stripped import *
from peacemathWeb.scripts.teal_37_stripped import getVariables

def getFig(num):
    zzz=App(str(num))
    box,box_colors = zzz.createBoxGraph()
    return (box,box_colors, getVariables(num))

def getChart(num ,data):
    zzz=App(str(num))
    box = zzz.recalculate(data)
    return (box)

#call the classes----


