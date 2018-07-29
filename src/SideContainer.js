import React, { Component } from 'react'
import Locations from './locations.json'//remove workaround

class SideContrainer extends Component {
	state = {
		visibleMarkers: []
	}

	updateQuery = (e) => {
		const queryEvent = e.target.value,
			query = this.props.query;
		//this.handleQuery(query)
		this.props.sendNewRequest({ query: queryEvent })
	}

/* 	handleQuery = ( query ) => {
		
	} */

	render() {
		const { query } = this.props;
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
						Locations.filter( el => {
							const regExp = new RegExp(query, 'i')
							return regExp.test(el.title)
						}).map( el => <li key={el.key}>{el.title}</li>)
						}
				</ul>
				</div>
				<div className="summary">
					<h3>A title</h3>
					<div id="description">Some description</div>
				</div>
			</div>
		)
	}
}

export default SideContrainer