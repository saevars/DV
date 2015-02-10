#!/usr/bin/env python3
import csv
import operator


def newObj():
	Lat = []
	Lon = []
	gps = open('gps.js','w')
	with open('gpsLarge.csv','r') as csvFile:
		lines = csv.reader(csvFile)
		for row in lines:
			gps.write('{id: ' +  str(row[0]) + ', x: ' + str(row[2]) + ', y: ' + str(row[1] + ', name: NoName},'))


if __name__ == "__main__":
	newObj()