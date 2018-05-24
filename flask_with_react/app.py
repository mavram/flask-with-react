
import os
from flask import Flask
from .config import get_env_config


def get_app():
    web_assets_folder = os.path.join(*[os.path.dirname(os.path.abspath(__file__)), 'webapp', 'static'])
    a = Flask(
        __name__.split('.')[0],
        static_folder=web_assets_folder,
        template_folder=web_assets_folder)
    a.config.from_mapping(get_env_config())
    return a


app = get_app()  # pylint: disable=invalid-name
