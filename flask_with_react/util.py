import functools
import logging


def trace(level=logging.INFO):
    def _trace(f):
        @functools.wraps(f)
        def f_with_decorator(*args, **kwargs):
            logger = logging.getLogger(f.__module__)
            if logger.isEnabledFor(level):
                def _args(a):
                    return f' : {a}' if a else ''
                logger.log(
                    level,
                    '%s: %s%s%s',
                    'n/a',
                    f.__name__,
                    _args(args),
                    _args(kwargs))
            return f(*args, **kwargs)
        return f_with_decorator
    return _trace
