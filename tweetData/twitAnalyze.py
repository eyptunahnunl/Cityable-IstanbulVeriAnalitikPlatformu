#!/usr/bin/python
import pandas as pd
import csv  
from nltk.tokenize import sent_tokenize


lines = []

with open('ibbData.txt') as f: # text file that contains all tweets mentioned with tag @istanbulbld
	# read all the lines of the text file and return them as a list of strings.
	lines = f.readlines()	

f.close()

all_file_contents = []
formattedLines = []


header = ['twitID', 'twitDate', 'twitTime', 'twitOwner', 'twitText']

with open('extractedTweets.csv', 'w', encoding='UTF8') as f:
	writer = csv.writer(f)

	# write the header
	writer.writerow(header)

	# write the data
	for x in range(len(lines)):
		twitText = ''
		sentence = lines[x].split(" ")
		#sentence = sent_tokenize(lines[x])
		twitID = str(sentence[0])	# from gathered data, classification is performed.s
		twitDate = sentence[1]
		twitTime = sentence[2]
		twitUseless = sentence[3]
		twitOwner = sentence[4]
		for i in range(5):
			sentence.remove(sentence[0])
		#for i in range(5, len(sentence)):
		#	if not sentence[i].startswith("@"):
		#		twitText = sentence[i]
		for word in sentence:	# ignore the other tags unless it it is istanbulbld
			if not word.startswith("@"):
				twitText += str(word)
				twitText += " "
		formattedLines.append(twitID)
		formattedLines.append(twitDate)
		formattedLines.append(twitTime)
		formattedLines.append(twitOwner)
		formattedLines.append(twitText)
		all_file_contents.append(formattedLines)
		print(twitText)
		#print("\n\n\n", formattedLines, "\n\n\n")
	writer.writerows(all_file_contents)
f.close()


    
