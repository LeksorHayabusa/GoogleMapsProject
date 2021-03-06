import React, { Component } from 'react'

class MapModule extends Component {
	state = {
		requestedLocs: [],
		allMarkers: [],
		matchedMarkers:[]
	}
	
	componentDidMount() {
    window.initMap = this.initMap
	}

	initMap = () => {
		const 
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

			//create a marker listener at the marker
			marker.addListener('click', () => {
				this.openInfoWindow(map, marker, infoWindow, element)
				this.resetAllIcons()
				marker.setIcon(hightlighedIcon);
				this.props.setChosenPlace(element)//changes location in mainState
			})

			//create a marker listener for clicking at the Title list
			const 
				listingId = element.title.toLowerCase().replace(/ /g, '_'),
				domId = document.getElementById(listingId);
			window.google.maps.event.addDomListener(domId, 'click', () => 	{
				this.resetAllIcons();
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

	resetAllIcons = () => { //resets marker's icon back to default 
		const color = 'ff0000';
		this.state.allMarkers.forEach( markerOld => markerOld.setIcon(this.changeIcon(color)))
	}

	openInfoWindow = (map, marker, infoWindow, element) => {
		const ulElements = document.getElementById('responseList');
		infoWindow.setContent(
			`${element.title}\n 
			<div id="preview">
				${this.getImages(element)}
			</div>
			<br>
			<span> provided by Pixabay</span>`)
		infoWindow.open(map, marker)
		infoWindow.addListener('closeclick', () => {
			this.resetAllIcons()
			infoWindow.close()
		})
		infoWindow.addListener('content_changed', () => this.resetAllIcons())
		window.google.maps.event.addDomListener(ulElements, 'click', () => infoWindow.close())
	}
	
	getImages = (element) => {
		let wasError;//fallback indicator
		let page = (!wasError) ? Math.ceil(Math.random() * 4) : 1,//fallback page no
			title = element.title.match(/[a-z]+/gi).join('+'),
			url = `https://pixabay.com/api/?
				key=4104852-aa3fef8040189bb5d796bb247
				&q=${title}
				&image_type=photo
				&per_page=3
				&page=${page}`;
		let html = "",
			imgListURL = [];
		fetch(url)
			.catch( er => {//the error is there is no requested page no with next error handling
				wasError = true
				throw new Error(er.statusText || er.status)})
			.then(res => res.json())
			.then( data => data.hits.map( el => {
				html += `<br><img 
					src='${el.webformatURL}'' 
					alt="the photo of ${element.title}" 
					width="200px">`
				document.getElementById('preview').innerHTML = html;
				})
			)
			.catch(er => this.getImages(element))//fallback second request
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

	
  render() {
		this.separateMarkers()
		return(
			<div id="map" className="map-container"></div>
		)
	}
}

export default MapModule