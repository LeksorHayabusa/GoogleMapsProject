import React, { Component } from 'react';
import MapModule from './MapModule'
import SideContrainer from './SideContainer'
import './App.css';


class App extends Component {
  state = {
    thirdLibs: [{
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg2rdz3d-A6_jSjvEE0ki5zfg9-NOhJMo&v=3&callback=initMap",
        async: '',
        defer: ''
    }],
    locs: [],
    query: ''
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
        <SideContrainer
          loc='{ this.state.locs }'
          sendNewRequest={(obj) => {
            this.setState(obj)
          }}
          query={ this.state.query }
        />
        <MapModule
          query={ this.state.query }
        />
      </div>
      
    );
  }
}

export default App;
