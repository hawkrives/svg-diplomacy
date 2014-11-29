import * as React from 'react'

let Tutorial = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Tutorial')

		return React.createElement('div',
			{id: 'tutorial'},
			title)
	}
})

export default Tutorial
