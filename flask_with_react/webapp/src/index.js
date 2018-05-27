
// bootstrap
import 'jquery'
import 'popper.js/dist/umd/popper'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// styles
import './css/styles'

// app
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App'

ReactDOM.render(<App/>, document.getElementById('__app__'))
