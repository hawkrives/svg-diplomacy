import * as React from 'react'

let Search = React.createClass({
	render() {
		return React.createElement('div', {id: 'search-screen'},
			React.createElement('input', {className: 'search-box', placeholder: 'Search for ...', type: 'search'}))
	}
})

export default Search
