# Flask-with-React #

This is a boilerplate application for a Flask backend using React with Boostrap frontend.

* Python 3.x
* Flask >= 1.0.2
* React >= 16.3.2
* React-Router >= 4.2.0
* Babel >= 6.26.6
* Webpack >= 4.8.3
* Bootstrap >= 4.1

## Server Command Line Tools ##

 * Flask Environment Variables:
   * `export FLASK_APP=flask_with_react.wsgi | flask_with_react.cli`
   * `export FLASK_ENV=development | testing | production`
   * Optional: `export FLASK_CONFIG=<path_to_custom_configuration_file>`
 * Development server: `flask run --host 0.0.0.0 --port 8080 --reload --with-threads`
 * Unit-tests: `pytest`. Note that it sets `FLASK_ENV` to `xunit`.
 * Coverage: `py.test --cov=flask_with_react`
 * Linting: `pylint --rcfile .pylintrc -f parseable flask_with_react`
 * Build dist package: `python3 setup.py sdist release`

## Webapp Command Line Tools ##

 * `export NODE_ENV = development | production`
 * `npm run build | watch | dist | test[:*] | start | clean`
