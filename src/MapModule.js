import React, { Component } from 'react'
import * as Locations from './locations.json'

class MapModule extends Component {

	componentDidMount() {
    window.initMap = this.initMap
	}

	placeMarker = (map, infoWindow) => {
		const markers = [];
		Locations.forEach( element => {
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
			center: {lat: 60.1719, lng: 14.9314},
			zoom: 11
		})
		this.placeMarker(map, infoWindow)
	}
  
  render() {
		return(
			<div id="map" className="map-container"></div>
		)
	}
}

export default MapModule