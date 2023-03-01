"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """initial specified number and counter """
        self.start_num = start
        self.counter = start

    def __str__(self):
        return f"SerialGenerator(start={self.start_num})"

    def generate(self):
        """ increment by 1"""
        return self.counter+1

    def reset(self):
        """ reset to initial value"""
        return self.start_num