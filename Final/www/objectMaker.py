#!/usr/bin/env python3
import csv
import operator

# Where the magic takes place
def run():
	Lat = []
	Lon = []
	i = 0
	f = open('objects.txt','w')

	with open('gpsShort.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		lines.__next__()
		for row in lines:
			Lat.append(row[3]) #longs
			Lon.append(row[4]) #lats

	with open('dmShort.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		for row in lines:
			for j in range(i,len(row)):
				print ("j: " + str(j) + "  i " + str(i))
				print( "{Cor1: [" + str(Lon[i]) + "," + str(Lat[i]) + "], Cor2: [" + str(Lon[j+1]) + "," + str(Lat[j+1]) + "] " + ",Dist: " + str(row[j]) + '},')
				f.write( "{Cor1: [" + str(Lon[i]) + "," + str(Lat[i]) + "], Cor2: [" + str(Lon[j+1]) + "," + str(Lat[j+1]) + "] " + ",Dist: " + str(row[j]) + '},')
			i += 1

	f.write("]")

if __name__ ==  "__main__":
	run()

[{Cor:[321312,321312],
  ConnectedHubs: [
	  {Cor:[231,321],
	   DistToOrig:222},
	  {Cor:[231,321],
	   DistToOrig:222},

  ]},
 {Cor:[321312,321312],
  ConnectedHubs: [
	  {Cor:[231,321],
	   DistToOrig:222}
  ]}

]

	#[{Lan1: [x1, x2], Lon: [y1, y2], d : ""},{Lan1: [x1, x2], Lon: [y1, y2], d : ""}]