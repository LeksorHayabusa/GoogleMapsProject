import React, { Component } from 'react'

class SideContrainer extends Component {
	state = {
		visibleMarkers: []
	}

	updateQuery = (e) => {
		const queryEvent = e.target.value,
			query = this.props.mainState.query;
		//this.handleQuery(query)
		this.props.sendNewRequest({ query: queryEvent })
		this.showDescription()
	}

	showDescription = (el) => {
		let description;
		if(!el) return;
		else description = el.title;
		const chosenPlace = this.props.chosenPlace;
		console.log(el)
		this.props.setChosenPlace(el)//changes location in mainState
	}

	/* componentDidMount() {
		this.getDescription()
	} */

	render() {
		const { query, description } = this.props.mainState;
		return (
			<div className="side-container">
				<h1 className="header">Googlemapsapp</h1>
				<div className="query-field">
					<input 
						type="text" 
						id="addressLine" 
						placeholder=" type an address or area" 
						onChange={ e => { this.updateQuery(e)	}}
						value={ query }
					/>
				<ul id="responseList">
					{
							this.props.loadedLocations.filter( el => {
							const regExp = new RegExp(query, 'i')
							return regExp.test(el.title)
						}).map( el =>
							<li 
								key={el.title}
								onClick={() => { this.showDescription(el)}}
							>{el.title}</li>)
						}
				</ul>
				</div>
				<div className="summary">
					<h3 className="description">In few words:</h3>
					<span className="description">provided by wikipedia</span>
					<div className="description-box">
						{ (!description) ? (<span className="placeholder">Click the marker or wait the internet connection</span>) : description}
					</div>
				</div>
			</div>
		)
	}
}

export default SideContrainer