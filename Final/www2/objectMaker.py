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
			Lat.append(("%.2f" % float(row[3]))) #longs
			Lon.append(("%.2f" % float(row[4]))) #lats
			a = "%.2f" % float(row[4])
			print(a)

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
	maxNumber = 300
	counter = 0
	ids 	 = {}
	Lat 	 = []
	matrixIdHor  = []
	nodeID   	 = 0

	gps = open('gpsData.js','w')
	gps.write("var gpsCoords = [")
	with open('Coords.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		lines.__next__()
		for row in lines:
			ids[row[0]] = [("%.2f" % float(row[2])),("%.2f" % float(row[1]))]
			if counter < maxNumber:
				gps.write('{id: ' +  str(row[0]) + ', x: ' + str(("%.2f" % float(row[2]))) + ', y: ' + str(("%.2f" % float(row[1])) + ', name: "NoName"}, \n'))
			counter += 1
	i = 0
	gps.write("]; \n var dataSet= [")
	with open('Indimatrix.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		for row in lines: #271 rows
			if i == 0:
				matrixIdVert = len(row) -1
				for k in range(len(row)):
					matrixIdHor.append(row[k])
				# print(row[k])
			elif  i < maxNumber:
				for j in range(0,i-1):
					#print("Id ver: ",row[matrixIdVert])
					#print("Id hor: ",matrixIdHor[j])
					#print(row[j])
					if j < maxNumber and float(row[j]) != 0.0:
						gps.write("{id: " + str(nodeID) +", Cor1: {id: " + str(row[matrixIdVert]) + ", x: " + str(ids[str(row[matrixIdVert])][0]) + ", y: " + str(ids[str(row[matrixIdVert])][1]) + ", name: 'NoName'}, Cor2: {id: "  + str(matrixIdHor[j]) + ", x: "+str(ids[str(matrixIdHor[j])][0]) + ", y: " + str(ids[str(matrixIdHor[j])][1]) + ", name: 'NoName'}, Dist: " + str(float(row[j])*0.0001) + "},\n")
						nodeID += 1
			i += 1
	gps.write("];")
if __name__ ==  "__main__":
	newObj()

	#{id: 2, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"} ,Dist: 0.000748},
	#{id: 1, x: 100.03333, y: 25.66667, name: "NoName"},