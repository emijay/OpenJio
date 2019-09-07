// map.jsx is the place where you start writing code for the Google Map component


import React, { Component } from 'react';

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            locations: [],
            startingPoint: { lat: 1.274495, lng: 103.846146 },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);

    }


    onMarkerClick(props, marker, event){
        console.log('clicked')
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

        console.log(props)
        console.log(marker)
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
            initialCenter={this.state.startingPoint}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={'Your Current Location'}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>

        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAYr3QLOOohxdLElgpNMi8J1c0GP-D9GY'
})(MapContainer);