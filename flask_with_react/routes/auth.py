
from flask import jsonify, request
from ..app import app
from ..util import trace
from ..auth import create_token

@app.route('/api/login', methods=['POST'])
@trace()
def login():
    if request.json['username'] == 'admin' and request.json['password'] == 'passwd':
        return jsonify(create_token({'id': 17}))
    return jsonify('Invalid credentials'), 401
