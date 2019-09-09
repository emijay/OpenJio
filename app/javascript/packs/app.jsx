// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Mainpage from '../components/mainpage'
import MapContainer from '../components/mapcontainer'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div className="container">
        <Router>
          <div className="container">
            <div className="row">
                <Route path="/" component={Mainpage} />
            </div>
          </div>
        </Router>
        <div className="container">
            <div className="row">
                <MapContainer />
            </div>
        </div>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})