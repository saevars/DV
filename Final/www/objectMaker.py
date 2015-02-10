#!/usr/bin/env python3
import csv
import operator

# Where the magic takes place
def run():
	Lat = []
	Lon = []
	i = 0
	noEdges = 0;
	f = open('objects.txt','w')

	with open('gpsShort.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		lines.__next__()
		for row in lines:
			Lat.append(("%.2f" % row[3])) #longs
			Lon.append(("%.2f" % row[4])) #lats

	with open('dmShort.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		for row in lines:
			for j in range(i,len(row)):
				# print ("j: " + str(j) + "  i " + str(i))
				print( "{id: "+ str(noEdges) +", Cor1: [" + str(Lon[i]) + "," + str(Lat[i]) + "], Cor2: [" + str(Lon[j+1]) + "," + str(Lat[j+1]) + "] " + ",Dist: " + str(row[j]) + '},')
				f.write( "{Cor1: [" + str(Lon[i]) + "," + str(Lat[i]) + "], Cor2: [" + str(Lon[j+1]) + "," + str(Lat[j+1]) + "] " + ",Dist: " + str(row[j]) + '},')
				noEdges+=1;
			i += 1

	f.write("];")

def newObj():
	maxNumber = 600
	counter = 0
	ids 	 = {}
	Lat 	 = []
	matrixIdHor  = []
	nodeID   	 = 0

	fileName = 'Iceland.js'
	extraVar = 'I'

	gps = open(fileName,'w')
	#gps.write("var gpsCoords" + extraVar + " = [")
	with open('Coords.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		lines.__next__()
		for row in lines:
			ids[row[0]] = [row[2],row[1]]
			#if counter < maxNumber:
				#gps.write('{id: ' +  str(row[0]) + ', x: ' + str(row[2]) + ', y: ' + str(row[1] + ', name: "NoName"}, \n'))
			#counter += 1

	i = 0

	gps.write("var dataSet" + extraVar + "= [")
	with open('Icepop.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		for row in lines: #271 rows
			if i == 0:
				matrixIdVert = len(row) -1
				for k in range(len(row)):
					matrixIdHor.append(row[k])
			elif  i < maxNumber:
				for j in range(0,i-1):
					if j < maxNumber:
						gps.write("{id: " + str(nodeID) +", Cor1: {id: " + str(row[matrixIdVert]) + ", x: " + str(ids[str(row[matrixIdVert])][0]) + ", y: " + str(ids[str(row[matrixIdVert])][1]) + ", name: 'NoName'}, Cor2: {id: "  + str(matrixIdHor[j]) + ", x: "+str(ids[str(matrixIdHor[j])][0]) + ", y: " + str(ids[str(matrixIdHor[j])][1]) + ", name: 'NoName'}, Dist: " + str(float(row[j])*0.0001) + "},\n")
						nodeID += 1
			i += 1
	

	gps.write(" ]; \n  var gpsCoords" + extraVar + " = [")
	with open('Coords.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		lines.__next__()
		for row in lines:
			if counter < maxNumber and  row[0] in matrixIdHor:
				gps.write('{id: ' +  str(row[0]) + ', x: ' + str(row[2]) + ', y: ' + str(row[1] + ', name: "NoName"}, \n'))
			counter += 1

	gps.write("];")
if __name__ ==  "__main__":
	newObj()
