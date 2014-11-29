import * as React from 'react'
import {Link} from 'react-router'

let GamesList = React.createClass({
	render() {
		return React.createElement('div', {id: 'game'}, 
			React.createElement('h2', null, "Active Games"),
			React.createElement('ul', null, 
				React.createElement(Link, {to: 'game', params: {gameId: 123}}, 'Game 123'))
		)
	}
})

export default GamesList