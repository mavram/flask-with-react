import React from 'react'
import renderer from 'react-test-renderer'
import {App} from '../src/js/App'


it('App basic creation', () => {
    const component = renderer.create(
        <App />
    )

    expect(component.toJSON()).toMatchSnapshot()
})
