// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Mainpage from '../components/mainpage'
import MapContainer from '../components/mapcontainer'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component{

    constructor() {
        super();
        this.state = {
            map: null
        }

        this.setActiveMarker = this.setActiveMarker.bind(this);
    }

    setActiveMarker(props,marker,val) {
        // console.log('setting active marker')
        // console.log(props)
        // console.log(marker)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <MapContainer sendData={this.setActiveMarker} />
                    <Mainpage sendData={this.setActiveMarker} />
                </div>
            </React.Fragment>
        )
    }



}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
        <Route path="/" render={()=>(
            <App />
        )} />
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})