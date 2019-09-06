// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Wee from '../components/wee'
import Mainpage from '../components/mainpage'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
        <Router>
          <div>
            <Route path="/" component={Mainpage} />
            <Route path="/wee" component={Wee} />
          </div>
        </Router>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})