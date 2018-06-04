from ..factory import get_app

UNIT_TESTING_ENV = 'xunit'

def test_get_app():
    app = get_app(UNIT_TESTING_ENV)
    assert app.config['ENV'] == UNIT_TESTING_ENV
