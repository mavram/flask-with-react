import click
from ..app import app
from ..config import get_config_param

@app.cli.command(short_help='Displays configuration.')
@click.option('--param', '-p')
def cfg(param):
    if not param:
        print('Missing parameter name.')
        return
    print(f'{param}={get_config_param(param)}')
