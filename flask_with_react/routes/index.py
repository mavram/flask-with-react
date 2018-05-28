
import logging
from flask import render_template, jsonify, url_for, redirect
from ..app import app

logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):  # pylint: disable=unused-argument
    return redirect(url_for('index'))

@app.errorhandler(Exception)
def unhandled_exception_handler(xcpt):
    logger.error('%s', str(xcpt))
    return jsonify({'status': 500, 'message': str(xcpt)}), 500
