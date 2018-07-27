import React, { Component } from 'react'
import * as Locations from './locations.json'
//npm i -S google-map-react  is the same as npm install --save google-map-react

class MapModule extends Component {

	componentDidMount() {
    window.initMap = this.initMap
	}

	placeMarker(map) {

		const markers = [];
		Locations.forEach( el => {
			let marker = new window.google.maps.Marker({
				position: el.position,
				title: el.title,
				map: map
			})
			markers.push(marker)
		})
	}

	initMap() {
		const mapContainer = document.getElementById('map');
		const infoWindow = new window.google.maps.InfoWindow()
		const map = new window.google.maps.Map(mapContainer,{
			center: {lat: 60.1719, lng: 14.9314},
			zoom: 11
		})
		this.placeMarker(map)
	}
  
  render() {
		return(
			<div id="map" className="map-container"></div>
		)
	}
}

export default MapModule