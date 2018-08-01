import React, { Component } from 'react'

class MapModule extends Component {
	state = {
		requestedLocs: [],
		allMarkers: [],
		matchedMarkers:[]
	}

	initMap = () => {
		const 
			edgeLocation = this.props.loadedLocations[4].position,
			allMarkers = this.state.allMarkers,
			mapContainer = document.getElementById('map'),
			bounds = new window.google.maps.LatLngBounds(),
			infoWindow = new window.google.maps.InfoWindow(),
			map = new window.google.maps.Map(mapContainer,{
				center: {lat: 53.541389, lng: 9.984167},
				zoom:14
			})
		this.placeMarker(map, infoWindow)
		allMarkers.forEach( marker => bounds.extend(marker.getPosition()))
		map.fitBounds(bounds)
	}

	placeMarker = (map, infoWindow) => {
		//creating markers for all locations
		const 
			allMarkers = this.state.allMarkers,
			locations = this.props.loadedLocations,
			hightlighedIcon = this.changeIcon('0091ff'),
			defaultIcon = this.changeIcon('ff0000')

		locations.forEach( element => {
			let marker = new window.google.maps.Marker({
				position: element.position,
				title: element.title,
				map: map,
				animation: window.google.maps.Animation.DROP,
				icon: defaultIcon
			})
			allMarkers.push(marker)

			//create a marker listener to open infowindow and description
			marker.addListener('click', (event) => {
				this.createInfoWindow(map, marker, infoWindow, element)
				marker.setIcon(hightlighedIcon);
				this.props.setChosenPlace(element, event)//changes location in mainState
			})

			//create a marker listener for clicking at the Title list
			const 
				listingId = element.title.toLowerCase().replace(/ /g, '_'),
				domId = document.getElementById(listingId);
			window.google.maps.event.addDomListener(domId, 'click', () => {
				allMarkers.forEach( marker => this.changeIcon(marker))
				marker.setIcon(hightlighedIcon)
			})
		})
	}

	changeIcon = (newIconColor) => {
		const newIcon = new window.google.maps.MarkerImage(
			`http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.0|0|${newIconColor}|60|_|%E2%80%A2`,
			new window.google.maps.Size(21, 34),
			new window.google.maps.Point(0, 0),
			new window.google.maps.Point(10, 34),
			new window.google.maps.Size(21,34)
		);
		return newIcon
	}

	resetIcon = (marker) => { //resets marker's icon back to default
		const defaultIcon = 'ff0000';
		return marker.setIcon(this.changeIcon(defaultIcon))
	}

	createInfoWindow = (map, marker, infoWindow, element) => {
		infoWindow.setContent(element.title)
		infoWindow.open(map, marker)
		infoWindow.addListener('closeclick', () => {
			this.resetIcon(marker)
			infoWindow.close()
		})
		infoWindow.addListener('content_changed', () => this.resetIcon(marker))
	}

	separateMarkers = () => {
		const //taking requested markers to matchedMatkers
			query = this.props.mainState.query,
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
		allMarkers.filter( (marker, i) => marker !== matchedMarkers[i])
			.forEach( marker => marker.setVisible(false))
		//we show all matched markers
		matchedMarkers.forEach( marker => marker.setVisible(true))
	}

	componentDidUpdate(prevState) {
/* 		if( !prevState.mainState.chosenPlace 
			&& !this.props.mainState.chosenPlace.title ) return;
		if(prevState.mainState.chosenPlace.title)
		if(this.props.mainState.chosenPlace.title != prevState.mainState.chosenPlace.title) {
			console.log(this.props.mainState.chosenPlace)
			console.log(prevState.mainState.chosenPlace) 
		}*/
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