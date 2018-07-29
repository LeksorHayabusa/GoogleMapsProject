import React, { Component } from 'react'
import Locations from './locations.json'

class MapModule extends Component {
	state = {
		requestedLocs: [],
		allMarkers: [],
		matchedMarkers:[]
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

	placeMarker = (map, infoWindow) => {
		//creating markers for all locations
		const allMarkers = this.state.allMarkers;
		Locations.forEach( element => {
			let marker = new window.google.maps.Marker({
				position: element.position,
				title: element.title,
				map: map
			})
			allMarkers.push(marker)
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

	separateMarkers = () => {
		const //taking requested markers to matchedMatkers
			query = this.props.query,
			regExp = new RegExp( query ),
			{ allMarkers } = this.state;
		if(!allMarkers) return;
		this.state.matchedMarkers = allMarkers.filter( marker => regExp.test(marker.title)).map( el => el);
		this.showLocs()
	}

	showLocs() {
		const allMarkers = this.state.allMarkers,
			matchedMarkers = this.state.matchedMarkers;
		//we take all unmatched markers and hide `em
		allMarkers.filter( (marker, i) => marker != matchedMarkers[i])
			.forEach( marker => marker.setVisible(false))
		//we show all matched markers
		matchedMarkers.forEach( marker => marker.setVisible(true))
	}

	componentDidMount() {
    window.initMap = this.initMap
	}
	
  render() {
		this.separateMarkers()
		return(
			<div id="map" className="map-container"></div>
		)
	}
}

export default MapModule