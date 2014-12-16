import * as React from 'react'

import gameActions from '../../actions/gameActions'

let GameJoin = React.createClass({
	addPlayerToGame() {
		// gameActions.addPlayerToGame(gameId, playerId)
	},
	render() {
		let progress = React.createElement('progress', {className: 'join-progress', max: this.props.maxPlayers, value: this.props.joinedPlayers}, this.props.joinedPlayers + ' / ' + this.props.maxPlayers)
		let joinGame = React.createElement('button', {className: 'join-button', onClick: this.addPlayerToGame}, 'Join Game')

		return React.createElement('div', {id: 'game-join'}, progress, joinGame)
	},
})

export default GameJoin
