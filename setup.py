import glob
import json
import setuptools

with open(glob.glob('**/app.json')[0]) as f:
    APP_INFO = json.load(f)

with open('README.md') as f:
    LONG_DRESCRIPTION = f.read()

setuptools.setup(
    name=APP_INFO['name'],
    version=APP_INFO['version'],
    description='Boilerplate project for Flask, React and Bootstrap.',
    url='https://github.com/mavram/flask-with-react',
    author='Mircea Avram',
    author_email='mavram@gmail.com',
    packages=setuptools.find_packages(),
    include_package_data=True,
    install_requires=[
        'flask>=1.0.2',
        'pylint>=1.8.4'
    ]
)
