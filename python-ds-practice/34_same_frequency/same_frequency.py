def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1Sorted = [int(d) for d in str(num1)]
    num1Sorted.sort()
    num2Sorted = [int(d) for d in str(num2)]
    num2Sorted.sort()
    return num1Sorted == num2Sorted