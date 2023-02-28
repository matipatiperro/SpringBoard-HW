def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    rtnWord = ""
    phrase=phrase.lower()
    for word in phrase.split(" "):
        if len(rtnWord) != 0:
            rtnWord= rtnWord +" "+ word.capitalize()
        else: 
            rtnWord= word.capitalize()
    return rtnWord
