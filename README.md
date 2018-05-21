# PeaceMath
**A GUI for the ordinary differential equation model of the Sustainable Peace Map**

coded in Python 3.4.1 with Tkinter

**MATHEMATICAL MODEL**
Liebovitch, LS, Coleman PT, Futran D, Lee D, Lichter T, Burgess N, Maksumov D, and Ripla C. (in press). Modeling the dynamics of sustainable peace. In U. Strawinska-Zanko and L. S. Liebovitch (Eds.), Mathematical Modeling of Social Relationships, New York, NY, Springer.

**VIDEO OF PROGRAM USE**
https://drive.google.com/drive/u/0/folders/0B3t7HoVL1Ct7dGtqX3JkSDE2T00

**LATEST VERSIONS ARE:**
data.py
teal.py
tealclass.py

#
### HOW TO RUN THESE PROGRAMS


Run Python Scripts in this order:

	1. data.py (this only needs to be done once)

	2. tealclass.py

	3. teal.py

The data files should be in the same directory of the programs:
  b8.txt, btextbxy8.txt, c8.txt, ic8.txt, m8.txt
  b105.txt, btextbxy105.txt, c105.txt, ic105.txt, m105.txt
  b111.txt, btextbxy111.txt, c111.txt, ic111.txt, m111.txt
  b202.txt, btextbxy202.txt, c202.txt, ic202.txt, m202.txt

When asked for "ONLY NUMBER n and I will find cn.txt, etc. (#/a, Def=a)"

	type either:
	8 (return)
	105 (return
	111 (return)
	202 (return)

When asked for "Want to CHANGE parameters (y/n), def=n"
	
	type: (return)


NOTE: for OS10.9.5 or Linux the programs should run, but for WINDOWS you may need to change the comment in orangeclass APP: 

        # self.mainloop() TO THE EXECUTABLE STATEMENT self.root.mainloop()
	
	
TO CHANGE INITIAL CONDITIONS: use the left hand entry widgets and ENTER

TO CHANGE THE CONNECTION MATRIX: click on a textbox, use the left hand entry widget, and ENTER (this will also show only the links into and out of that textbox, use ALL Cij to show all the links)

TO RUN THE CALCULATION: use CALCULATE

TO SWITCH FROM THE LINKS TO THE INITIAL CONDITIONS use IC on the links input

TO RESTORE THE ORIGINAL INITIAL CONDITIONS use ORIGINAL on the initial conditions input
	
