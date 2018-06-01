
import logging
from flask import jsonify, request
from ..app import app

logger = logging.getLogger(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    logger.info(request.json)
    # add implementation
    return jsonify('OK')
