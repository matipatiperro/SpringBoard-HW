def print_upper_words(words):
	""" print words to upper case, pass in starting letters for words"""
	#part 2 of the hw

	for word in words:
		print (word.upper())

def print_upper_words3(words):
	""" print words that start with E to upper case"""
	# part 3 of the hw Change that function so that it only prints words that
	# start with the letter ‘e’ (either upper or lowercase).

	for word in words:
		if word[0].upper() == "E":
			print (word.upper())

def print_upper_words4(words, start_letter):
	""" print words to upper case, pass in starting letters for words """
	# part 3 of the hw Make your function more general: you should be able to pass in a 
	# set of letters, and it only prints words that start with one of those letters.

	for word in words:
		for letter in start_letter:
			if word[0].upper() == letter.upper():
				print (word.upper())