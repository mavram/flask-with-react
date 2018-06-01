
from flask import jsonify
from ..app import app
from ..util import trace

@app.route('/api/login', methods=['POST'])
@trace()
def login():
    # add implementation
    return jsonify('OK')
