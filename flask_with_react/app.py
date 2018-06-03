
import json
import logging
from logging.handlers import RotatingFileHandler
import os
from flask import Flask


BASE_DIR = basedir = os.path.abspath(os.path.dirname(__file__))
WEBAPP_DIR = os.path.join(*[BASE_DIR, 'webapp', 'dist'])
CONFIG_DIR = os.path.join(*[BASE_DIR, 'config'])


def get_app():
    a = Flask(
        __name__.split('.')[0],
        static_url_path='',
        static_folder=WEBAPP_DIR,
        template_folder=WEBAPP_DIR)

    env = os.environ['FLASK_ENV'] if 'FLASK_ENV' in os.environ else None
    if not env:
        raise ValueError('Missing environment definition.')
    try:
        a.config.from_pyfile(os.path.join(*[CONFIG_DIR, 'default.py']))
        a.config.from_pyfile(os.path.join(*[CONFIG_DIR, f'{env}.py']))
    except FileNotFoundError:
        raise ValueError(f'Unknown environment. {env}')

    if 'FLASK_CONFIG' in os.environ:
        try:
            a.config.from_envvar('FLASK_CONFIG')
        except FileNotFoundError:
            local_config = os.environ['FLASK_CONFIG']
            raise ValueError(f'Missing local configuration. {local_config}')

    def get_log_level():
        return logging.DEBUG if a.config['DEBUG'] else logging.INFO

    def get_log_handlers():
        formatter = logging.Formatter('%(asctime)s %(process)s %(pathname)s:%(lineno)d: %(message)s')
        handlers = []
        fh = RotatingFileHandler(a.config['LOG_PATH'], backupCount=3)
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

    with open(os.path.join(*[WEBAPP_DIR, 'app.json'])) as f:
        app_info = json.load(f)
        a.config['VERSION'] = app_info['version']
        a.config['NAME'] = app_info['name']

    logging.getLogger(__name__).info(
        '%s-%s : %s : %s : %s',
        a.config['NAME'],
        a.config['VERSION'],
        a.config['ENV'],
        WEBAPP_DIR,
        os.environ['FLASK_CONFIG'] if 'FLASK_CONFIG' in os.environ else 'No local configuration.')

    return a


app = get_app()
