import * as React from 'react'
import {Link} from 'react-router'

let GamesList = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Active Games')

		return React.createElement('div',
			{id: 'games-list'},
			title,
			React.createElement('ul', null, 
				React.createElement(Link, {to: 'game', params: {gameId: 123}}, 'Game 123'))
		)
	}
})

export default GamesList
