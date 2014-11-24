import * as React from 'react'

let Search = React.createClass({
	render() {
		return React.createElement('div', {id: 'search-screen'},
			React.createElement('label', {htmlFor: 'f', style: {display: 'block'}}, "Search for Stuff"),
			React.createElement('input', {id: 'f', placeholder: 'Search for ...'}))
	}
})

export default Search
