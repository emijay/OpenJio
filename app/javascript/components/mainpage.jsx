// app.jsx is the place where you start writing your actual react app.

import React from 'react'

export default class Mainpage extends React.Component{

    constructor() {
        super();
        this.state = {
            input:[]
        }

        this.onMouseEnter = this.onMouseEnter.bind(this);

    }

    onMouseEnter(lati,long){
        this.props.sendData(lati,long);
    }

    componentDidMount(){

        var request = new XMLHttpRequest();

        var componentThis = this;

        request.addEventListener("load", function(){
          const responseData = JSON.parse( this.responseText );
          // console.log( responseData );

          // set state to put data in the component
          let array = responseData.map((item,index) => {
            return(<tr key={index} onMouseEnter={ (lati,long) => componentThis.onMouseEnter(item.latitude, item.longitude) }>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td>
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
            <React.Fragment>
            <div className="mainContainer row">
                <h1 className="text-center">Events Around You</h1>

                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date and Time</th>
                        <th scope="col">Host</th>
                    </tr>
                  </thead>

                  <tbody>
                        {this.state.input}
                  </tbody>
                </table>

            </div>
            </React.Fragment>
        );
    }
}