import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import MapModule from './MapModule'
import SideContainer from './SideContainer'
import Locations from './locations.json'
import './App.css';


class App extends Component {
  state = {
    thirdLibs: [{
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg2rdz3d-A6_jSjvEE0ki5zfg9-NOhJMo&v=3&callback=initMap",
        async: '',
        defer: '',
        onerror:"mapError()"
    }],
    locs: [],
    query: '',
    chosenPlace: '',
    description: '',
		chosenElement: ''
  }

  mapError = () => {
    window.gm_authFailure = function () {
        alert('usage quota exceeded, try later')
    }
    document.write('Map load faild, please reload the page later')
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

  setChosenPlace = (place, event) => {
    this.setState({ chosenPlace: place }, () => this.getDescription())
  }
    
    getDescription = () => {
    const 
      place = this.state.chosenPlace,
      searchLocation = place.title;
    if(!searchLocation) return;
		this.prepareAPIQuery(searchLocation)
	}

	prepareAPIQuery = (locationName) => {
		const searchLocation = locationName.replace(/ /g, '%20')
		const api = `https://en.wikipedia.org/w/api.php?format=json&action=query&titles=${searchLocation}&prop=extracts&exintro=&explaintext=&origin=*`;
		fetchJsonp(api).then(res => res.json()).then(data => {
				const pageID = Object.keys(data.query.pages)[0];
        const description = data.query.pages[pageID].extract;
        this.setNewDescription(description)
        //this.setChosenPlace(place)
			})
			.catch( err => this.setNewDescription('you`re offline, repeat your request when internet is available'))
    }
    
    setNewDescription = (newDescription) => {
      const { chosenPlace }= this.state;
      if(chosenPlace && !newDescription) 
      newDescription = 'Click the marker or wait for the internet connection';
      this.setState({ description: newDescription })
  }

  componentWillMount() {
    this.loadLibs( this.state.thirdLibs)
//    this.loadStyles( this.state.thirdStyles)
    this.getDescription()
  }

  componentDidMount() {
    this.setNewDescription()
  }

  render() {
    return (
      <div className="App">
        <SideContainer
          //loc='{ this.state.locs }'
          sendNewRequest={(obj) => {
            this.setState(obj)
          }}
          loadedLocations={ Locations }
          mainState={ this.state }
          setChosenPlace={ this.setChosenPlace }//function
          //setNewDescription={ this.setNewDescription }//function
          // query={ this.state.query }
          // setChosenPlace={ this.setChosenPlace }
          // setNewDescription={ this.state.description }
        />
        <MapModule
          loadedLocations={ Locations }
          mainState={ this.state }
          // query={ this.state.query }
          // chosenPlace={ this.state.chosenPlace }
          setChosenPlace={ this.setChosenPlace }//function
        />
      </div>
      
    );
  }
}

export default App;
