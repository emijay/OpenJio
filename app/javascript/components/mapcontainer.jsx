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
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            map: null
        };

        this.setActiveMarker = this.setActiveMarker.bind(this);
        this.getFromCurrentLocation = this.getFromCurrentLocation.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    // this is to get the 'map' class from CurrentLocation component
    getFromCurrentLocation(map){
        this.setState({ map : map });

    };

    setActiveMarker(props, marker, event){

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

        let google = this.props.google;
        let maps = google.maps;

        let lati = this.state.activeMarker.position.lat()
        let long = this.state.activeMarker.position.lng()

        let center = new maps.LatLng(lati, long);

        let map = this.state.map;

        map.panTo(center);

        console.log(this.state.selectedPlace)

    };

    onClose(props){
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
    };

    // this makes an AJAX call to the events page
    componentDidMount(){

        var request = new XMLHttpRequest();

        var componentThis = this;

        request.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );

          let newArray = componentThis.state.locations;

          responseData.forEach((element) => {
            newArray.push({ lat: element.latitude, lng: element.longitude, name: element.title, description: element.description })
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
                onClick={this.setActiveMarker}
                position={{ lat: location.lat, lng: location.lng }}
                name={[ location.name, location.description ]}
              />
            )
        });

        return (
        <div className="row">
            <h1 className="position-absolute" style={{left: '50%', transform: 'translate(-50%, 0)'}}>Events Around You</h1>
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            sendToMapContainer={this.getFromCurrentLocation}
          >
            <Marker
              icon="https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png"
              onClick={this.setActiveMarker}
              name={'Current Location'}
            />
            {marker}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
              content="sometstring"
            >
              <div className="container text-center" style={{width: '10rem'}}>
                    <h5>{this.state.selectedPlace.name}</h5>
              </div>
            </InfoWindow>
          </CurrentLocation>
        </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAYr3QLOOohxdLElgpNMi8J1c0GP-D9GY'
})(MapContainer);