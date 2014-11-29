import * as React from 'react'
import {State} from 'react-router'

let Game = React.createClass({
	mixins: [State],
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Active Game (id: ' + this.getParams().gameId + ')')

		return React.createElement('div',
			{id: 'game'},
			title)
	}
})

export default Game
