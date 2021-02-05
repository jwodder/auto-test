from . import _version

__version__ = "0.2.4"

def fibonacci(n):
    """
    >>> fibonacci(0)
    0
    >>> fibonacci(1)
    1
    >>> fibonacci(2)
    1
    >>> fibonacci(3)
    2
    >>> fibonacci(12)
    144
    """
    (a,b) = (0,1)
    for _ in range(n):
        (a,b) = (b, a+b)
    return a
