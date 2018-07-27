import React, { Component } from 'react';
import MapModule from './MapModule'
import './App.css';


class App extends Component {
  state = {
    thirdLibs: [{
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg2rdz3d-A6_jSjvEE0ki5zfg9-NOhJMo&v=3&callback=initMap",
        async: '',
        defer: ''
    }]
  }

  loadLibs(libs) {
    libs.forEach( lib => {
      const script = document.createElement('script');
      const child = document.getElementById('root');
      document.body.insertBefore(script, child)
      for (let key in lib){
        script.setAttribute(key, lib[key])
      }
    })
  }

  componentWillMount() {
    this.loadLibs( this.state.thirdLibs)
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Googlemapsapp</h1>
        <MapModule/>
      </div>
      
    );
  }
}

export default App;
