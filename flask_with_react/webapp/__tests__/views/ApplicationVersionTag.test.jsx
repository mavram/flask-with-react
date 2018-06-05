import React from 'react'
import renderer from 'react-test-renderer'
import {ApplicationVersionTag} from '../../src/js/views/ApplicationVersionTag'


it('ApplicationVersionTag basic creation', () => {
    const component = renderer.create(
        <ApplicationVersionTag />
    )

    expect(component.toJSON()).toMatchSnapshot()
})
