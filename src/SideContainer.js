import React, { Component } from 'react'

class SideContainer extends Component {
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
		//const chosenPlace = this.props.chosenPlace;
		this.props.setChosenPlace(el)//changes location in mainState
	}

	render() {
		const { query, description } = this.props.mainState;
		return (
			<div className="side-container">
				<h1 className="header">Hamburg online!</h1>
				<div className="query-field">
					<input 
						type="text" 
						id="addressLine" 
						aria-labelledby="filter locations"
						placeholder="type a location to visit" 
						onChange={ e => { this.updateQuery(e)	}}
						value={ query }
						tabIndex={0}
					/>
				<ul id="responseList">
					{
							this.props.loadedLocations.filter( el => {
							const regExp = new RegExp(query, 'i')
							return regExp.test(el.title)
						}).map( el =>
							<li 
								key={el.title}
								tabIndex={0}
								role="button"
								id={el.title.toLowerCase().replace(/ /g, '_')}
								onClick={(event) => {
									this.showDescription(el)}}
								onKeyPress={() => {this.showDescription(el)}}
							>{el.title}</li>)
						}
				</ul>
				</div>
				<div className="summary" tabIndex={0} >
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

export default SideContainer