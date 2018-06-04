import click
from ..app import app

@app.cli.command(short_help='Displays configuration parameter.')
@click.option('--param', '-p')
def config(param):
    if not param:
        print('Missing parameter name.')
        return
    if param not in app.config:
        print(f'Unknown parameter name. {param}')
        return
    print(f'{param}={app.config[param]}')
