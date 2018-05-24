
import functools
import os
from flask import Config

@functools.lru_cache()
def get_env_config():
    env = os.environ['FLASK_ENV'] if 'FLASK_ENV' in os.environ else None
    if not env:
        raise ValueError('Missing environment definition.')
    config = Config(os.path.dirname(__file__))
    try:
        config.from_pyfile(f'default.py')
        config.from_pyfile(f'{env}.py')
    except FileNotFoundError:
        raise ValueError(f'Unknown environment. {env}')
    return config

@functools.lru_cache()
def get_config_param(name):
    if name in os.environ:
        return os.environ[name]
    elif name in get_env_config():
        return get_env_config()[name]
    raise ValueError(f'Unknown configuration parameter. {name}')
