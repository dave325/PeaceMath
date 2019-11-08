
from peacemathWeb.scripts.tealclass_37_stripped import *
from peacemathWeb.scripts.teal_37_stripped import getVariables
def getFig():
    zzz=App()
    box,box_colors = zzz.createBoxGraph()
    return (box,box_colors, getVariables())

def getChart(data):
    zzz=App()
    box = zzz.recalculate(data)
    return (box)
#call the classes----