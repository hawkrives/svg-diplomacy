import * as React from 'react'
import ContentEditable from './content-editable'
import gameActions from '../actions/gameActions'

let GameHeader = React.createClass({
	saveGame() {
		console.log('saving', this.props.gameId)
		gameActions.editGameTitle(this.props.gameId, this.refs.title.getDOMNode().textContent)
	},
	render() {
		let gameTitle = React.createElement('h1', {className: 'game-title'},
			React.createElement(ContentEditable, {
				text: this.props.title,
				ref: 'title',
				onEnter: this.saveGame,
		}))

		let playerCountry = React.createElement('div', {className: 'player-country', style: {backgroundColor: this.props.tint}}, this.props.playerCountry)

		return React.createElement('div', {className: 'game-header'},
			gameTitle,
			this.props.playerCountry ? playerCountry : null
		)
	},
})

export default GameHeader
