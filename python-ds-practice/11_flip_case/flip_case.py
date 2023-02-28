def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    returnWord = ""
    for char in phrase:
        if char == to_swap:
            returnWord += char.swapcase()
        elif char.swapcase() == to_swap:
            returnWord += char.swapcase()
        else:
            returnWord += char
    return returnWord


