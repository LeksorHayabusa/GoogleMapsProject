import React, { Component } from 'react'
import Locations from './locations.json'

class MapModule extends Component {
	state = {
		requestedLocs: [],
		matchedLocs:[]
	}

	separateMarkers = () => {
		const 
			query = this.props.query,
			regExp = new RegExp( query ),
			{ requestedLocs} = this.state.requestedLocs;
		this.state.matchedLocs = Locations.filter( loc => regExp.test(loc.title)).map( el => el);
		let locs = this.state.matchedLocs;
		this.setState({ requestedLocs: locs })
		//console.log('separated markers: ')
		//console.log(this.state.requestedLocs)
	}

	placeMarker = (map, infoWindow) => {
		//console.log('special message: ' + this.props.query)
		this.separateMarkers()
		const 
			markers = [],
			locs = this.state.requestedLocs;
		locs.forEach( element => {
			let marker = new window.google.maps.Marker({
				position: element.position,
				title: element.title,
				map: map
			})
			markers.push(marker)
			marker.addListener('click', () => {
				this.createInfoWindow(map, marker, infoWindow, element)
			})
		})
	}

	createInfoWindow = (map, marker, infoWindow, element) => {
		infoWindow.setContent(`this is content of ${element.title}`)
		infoWindow.open(map, marker)
		infoWindow.addListener('closeclick', () => infoWindow.close())
	}

	initMap = () => {
		const mapContainer = document.getElementById('map');
		const infoWindow = new window.google.maps.InfoWindow()
		const map = new window.google.maps.Map(mapContainer,{
			center: {lat: 59.22283, lng: 17.9422},
			zoom: 14
		})
		this.placeMarker(map, infoWindow)
	}

  shouldComponentUpdate(nextProps, nextState) {
		return this.props.query != nextProps	
	}

	componentDidMount() {
    window.initMap = this.initMap
	}
  
  render() {
		return(
			<div id="map" className="map-container"></div>
		)
	}
}

export default MapModule