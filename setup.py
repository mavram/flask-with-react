import glob
import json
import setuptools

with open(glob.glob('*/webapp/dist/app.json')[0]) as f:
    APP_INFO = json.load(f)

with open('README.md') as f:
    LONG_DRESCRIPTION = f.read()

setuptools.setup(
    name=APP_INFO['name'],
    version=APP_INFO['version'],
    license=APP_INFO['license'],
    description=APP_INFO['description'],
    url=APP_INFO['repository']["url"],
    author=APP_INFO['author']['name'],
    author_email=APP_INFO['author']['email'],
    packages=setuptools.find_packages(),
    include_package_data=True,
    install_requires=[
        'flask>=1.0.2'
    ],
    extras_require={
        'development': [
            'pylint>=1.8.4',
            'pytest>=3.6.0',
            'pytest-cov>=2.5.1'
        ]
    },
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
    ]
)
