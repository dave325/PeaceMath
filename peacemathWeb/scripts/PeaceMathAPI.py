
from peacemathWeb.scripts.tealclass_37_stripped import *
from peacemathWeb.scripts.teal_37_stripped import getVariables
def getFig():
    zzz=App()
    box,box_colors = zzz.createBoxGraph()
    return (box,box_colors, getVariables())

def getChart():
    zzz=App()
    box = zzz.recalculate()
    return (box)
#call the classes----