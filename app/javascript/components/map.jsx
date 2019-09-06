// map.jsx is the place where you start writing code for the Google Map component


import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };
    }

    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };


    onClose(props){
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
    };

    render() {
        return (
          <Map
            google={this.props.google}
            zoom={18}
            style={mapStyles}
            initialCenter={{
             lat: 1.274495,
             lng: 103.846146
            }}
          />
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAYr3QLOOohxdLElgpNMi8J1c0GP-D9GY'
})(MapContainer);