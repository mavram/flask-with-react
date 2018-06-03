import functools
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer
from itsdangerous import SignatureExpired, BadSignature
from .app import app


ONE_MONTH = 2419200


def create_token(user, expiration=ONE_MONTH):
    return TimedJSONWebSignatureSerializer(
        app.config['JWT_SECRET_KEY'],
        expires_in=expiration).dumps(user).decode('utf-8')


def load_token(t):
    try:
        return TimedJSONWebSignatureSerializer(app.config['JWT_SECRET_KEY']).loads(t.encode('ascii', 'ignore'))
    except (BadSignature, SignatureExpired):
        return None


def restricted(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        jwt = request.headers.get('Authorization', None)
        if jwt:
            user = load_token(jwt)
            if user:
                g.current_user = user
                return f(*args, **kwargs)
        return jsonify(message='Authentication required.'), 401
    return decorated
