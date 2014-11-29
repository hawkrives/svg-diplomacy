import * as React from 'react'
import {State} from 'react-router'

let Game = React.createClass({
	mixins: [State],
	render() {
		return React.createElement('div', {id: 'game'}, "Active Game (id: " + this.getParams().gameId + ")")
	}
})

export default Game
