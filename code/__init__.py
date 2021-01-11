from . import _version
from math import sqrt

__version__ = _version.get_versions()["version"]

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

PHI = (1 + sqrt(5) / 2)
