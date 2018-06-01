import React from 'react'


export class SettingsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // load settings
    }

    render() {
        // render based on settings
        return this.props.children
    }
}
