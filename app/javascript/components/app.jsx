// app.jsx is the place where you start writing your actual react app.

import React from 'react'

export default class App extends React.Component{

    constructor() {
        super();
        this.state = {
            input:[]
        }
    }

    componentDidMount(){

        var request = new XMLHttpRequest();

        var componentThis = this;

        request.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );
          // console.log( responseData );

          // set state to put data in the component
          let array = responseData.map((item,index) => {
            return(<tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                        <td>{item.imgURL}</td>
                        <td>{item.user_id}</td>
                    </tr>

            )
          })

          componentThis.setState({input: array})
        });

        request.open("GET", '/events.json');

        request.send();
    }

    render(){

        return(
            <div>
                <h1>Current Events Available</h1>
                <div>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date and Time</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Imgurl</th>
                      <th>Host</th>
                      <th colSpan="3"></th>
                    </tr>
                  </thead>

                  <tbody>
                        {this.state.input}
                  </tbody>
                </table>
                </div>
            </div>
        );
    }
}