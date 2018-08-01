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
        defer: ''
    }],
    locs: [],
    query: '',
    chosenPlace:'',
    description: ''
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

  setChosenPlace = (place) => {
    this.setState({ chosenPlace: place })
    console.log(place)
    console.log(this.state.chosenPlace)
    this.getDescription()
  }
    
    getDescription = () => {
		let result, api, body;
    const 
      obj = { "lat": 53.541389, "lng": 9.984167 },
      place = this.state.chosenPlace,
      searchLocation = place.title;
    console.log(place)
    if(!searchLocation) return;
		this.prepareAPIQuery(searchLocation)
	}

	prepareAPIQuery = (locationName) => {
		let result;
		const searchLocation = locationName.replace(/ /g, '%20')
		const api = `https://en.wikipedia.org/w/api.php?format=json&action=query&titles=${searchLocation}&prop=extracts&exintro=&explaintext=&origin=*`;
		fetchJsonp(api).then(res => res.json()).then(data => {
				const pageID = Object.keys(data.query.pages)[0];
        const description = data.query.pages[pageID].extract;
        this.setNewDescription(description)
        //this.setChosenPlace(place)
			})
			.catch( err => console.log('parsing failed', err))
    }
    
    /* 	applyNewDescription = (newDescription) => {
      this.props.setNewDescription(newDescription)
    } */
    
    setNewDescription = (newDescription) => {
      const { chosenPlace }= this.state;
      if(chosenPlace && !newDescription) 
      newDescription = 'Click the marker or wait for the internet connection';
      this.setState({ description: newDescription })
      console.log(this.state.description)
  }

  componentWillMount() {
    this.loadLibs( this.state.thirdLibs)
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
