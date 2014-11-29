import * as React from 'react'

let Search = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Search')

		return React.createElement('div',
			{id: 'search'},
			title,
			React.createElement('input', {className: 'search-box', placeholder: 'Search for ...', type: 'search'}))
	}
})

export default Search
