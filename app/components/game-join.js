import * as React from 'react'
import * as _ from 'lodash'

import gameActions from '../actions/gameActions'

let GameJoin = React.createClass({
	addPlayerToGame() {
		gameActions.addPlayerToGame(this.props.gameId, this.props.userId)
	},
	removePlayerFromGame() {
		gameActions.removePlayerFromGame(this.props.gameId, this.props.userId)
	},
	render() {
		let joinGame;
		if (_.contains(this.props.joinedPlayers, this.props.userId)) {
			joinGame = React.createElement('button', {className: 'join-button', onClick: this.removePlayerFromGame}, 'Leave Game')
		}
		else {
			joinGame = React.createElement('button', {className: 'join-button', onClick: this.addPlayerToGame}, 'Join Game')
		}
		let progress = React.createElement('progress', {className: 'join-progress', max: this.props.maxPlayers, value: this.props.joinedPlayers.length}, this.props.joinedPlayers + ' / ' + this.props.maxPlayers)

		return React.createElement('div', {id: 'game-join'}, progress, joinGame)
	},
})

export default GameJoin
