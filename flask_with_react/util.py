import functools
import logging
from flask import g


def trace(level=logging.INFO):
    def _trace(f):
        @functools.wraps(f)
        def decorated(*args, **kwargs):
            logger = logging.getLogger(f.__module__)
            if logger.isEnabledFor(level):
                def _args(a):
                    return f' : {a}' if a else ''
                logger.log(
                    level,
                    '%s: %s%s%s',
                    g.current_user['id'] if 'current_user' in g else 'n/a',
                    f.__name__,
                    _args(args),
                    _args(kwargs))
            return f(*args, **kwargs)
        return decorated
    return _trace
