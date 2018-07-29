import React, { Component } from 'react'
import * as Locations from './locations.json'

class MapModule extends Component {
	constructor () {
		super();
		//this.initMap = this.initMap.bind(this);
	}

	componentDidMount() {
    window.initMap = this.initMap
	}

	placeMarker = (map) => {

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

	initMap = () => {
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