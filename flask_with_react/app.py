
import json
import logging
from logging.handlers import RotatingFileHandler
import os
import functools
from flask import Flask, Config

APP_ROOT = os.path.dirname(__file__)

@functools.lru_cache()
def get_config():
    env = os.environ['FLASK_ENV'] if 'FLASK_ENV' in os.environ else None
    if not env:
        raise ValueError('Missing environment definition.')
    c = Config(os.path.join(os.path.dirname(__file__), 'config'))
    try:
        c.from_pyfile(f'default.py')
        c.from_pyfile(f'{env}.py')
    except FileNotFoundError:
        raise ValueError(f'Unknown environment. {env}')
    return c

@functools.lru_cache()
def get_config_param(name, default=None):
    if name in os.environ:
        return os.environ[name]
    elif name in get_config():
        return get_config()[name]
    elif default is not None:
        return default
    raise ValueError(f'Unknown configuration parameter. {name}')


def get_app():
    web_assets_folder = os.path.join(*[APP_ROOT, 'webapp', 'dist'])
    a = Flask(
        __name__.split('.')[0],
        static_url_path='',
        static_folder=web_assets_folder,
        template_folder=web_assets_folder)
    a.config.from_mapping(get_config())

    def get_log_level():
        return logging.DEBUG if a.config['DEBUG'] else logging.INFO

    def get_log_handlers():
        formatter = logging.Formatter('%(asctime)s %(process)s %(pathname)s:%(lineno)d: %(message)s')
        handlers = []
        fh = RotatingFileHandler(get_config_param('LOG_PATH'), backupCount=3)
        fh.setLevel(get_log_level())
        fh.setFormatter(formatter)
        handlers.append(fh)
        if a.config['DEBUG']:
            ch = logging.StreamHandler()
            ch.setLevel(logging.DEBUG)
            ch.setFormatter(formatter)
            handlers.append(ch)
        return handlers

    logger = logging.getLogger(a.name)
    logger.setLevel(get_log_level())
    _ = [logger.addHandler(h) for h in get_log_handlers()]

    with open(os.path.join(*[APP_ROOT, 'webapp', 'src', 'app.json'])) as f:
        app_info = json.load(f)
    logging.getLogger(__name__).info(
        '%s-%s : %s : %s',
        app_info['name'],
        app_info['version'],
        a.config['ENV'],
        web_assets_folder)

    return a

app = get_app()
