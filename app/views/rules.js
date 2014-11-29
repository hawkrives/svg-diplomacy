import * as React from 'react'

let Rules = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Rules')

		return React.createElement('div',
			{id: 'rules'},
			title)
	}
})

export default Rules
