// map.jsx is the place where you start writing code for the Google Map component


import React, { Component } from 'react';

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './map';


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

    onMarkerClick(props, marker, event, map, maps){

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

        // if (map) {
        // const latLng = maps.LatLng(lat, lng);
        // // Makes a latlng
        // map.panTo(latLng);
        // }
        // console.log(latLng)

        map = this.map;
        google = this.props.google;
        maps = google.maps;

        console.log(map)
        console.log(maps.map)


        if (map) {
            let center = new maps.LatLng(10.23,123.45);
            map.panTo(center);
        }


    };

    onClose(props){
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
    };

    componentDidMount(){

        var request = new XMLHttpRequest();

        var componentThis = this;

        request.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );

          let newArray = componentThis.state.locations;

          responseData.forEach((element) => {
            newArray.push({ lat: element.latitude, lng: element.longitude, name: element.title })
          })

          componentThis.setState({ locations: newArray });

        });

        request.open("GET", '/events.json');

        request.send();
    }

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
              icon="https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png"
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