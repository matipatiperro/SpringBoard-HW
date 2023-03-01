import random
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    def __init__(self,filepath):
        self.path=filepath
        f = open(self.path, "r")
        self.words = self.readlines(f)
        # print(f.read())
        self.num_words = len(self.words)

    def readlines(self,file):
        return file.read().splitlines() 

    def random(self):
        return self.words[random.randint(0,self.num_words)]

class SpecialWordFinder(WordFinder):
    # def __init__(self):

    def readlines(self,f):
        return [w.strip() for w in f if w.strip() and not w.startswith("#")]