// map.jsx is the place where you start writing code for the Google Map component


import React, { Component } from 'react';

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './map';



const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            locations: [{lat: 1.331659, lng: 103.947926, name: "first location"},
            {lat: 1.325293, lng: 103.929558, name:"second location"}],
            startingPoint: { lat: 1.274495, lng: 103.846146 },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    onMarkerClick(props, marker, event){

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

        let marker = this.state.locations.map((location, i) => {
            return (
              <Marker
                key={i}
                onClick={this.onMarkerClick}
                position={{ lat: location.lat, lng: location.lng }}
                name={location.name}
              />
            )
        });

        return (
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={'Current Location'}
            />
            {marker}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <p>{this.state.selectedPlace.name}</p>
              </div>
            </InfoWindow>
          </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAYr3QLOOohxdLElgpNMi8J1c0GP-D9GY'
})(MapContainer);