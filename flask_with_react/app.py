
import os
from flask import Flask
from .config import get_env_config


def get_app():
    web_assets_folder = os.path.join(*[os.path.dirname(os.path.abspath(__file__)), 'webapp', 'static'])
    c = get_env_config()
    a = Flask(
        __name__.split('.')[0],
        static_folder=web_assets_folder,
        template_folder=web_assets_folder)
    a.config.from_mapping(c)
    return a


app = get_app()

@app.before_first_request
def at_startup():
    print('Started...')
