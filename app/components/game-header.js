import * as React from 'react'
import ContentEditable from './content-editable'
import gameActions from '../actions/gameActions'

let GameHeader = React.createClass({
	saveGame() {
		console.log('saving', this.props.gameId)
		gameActions.editGameTitle(this.props.gameId, this.refs.title.getDOMNode().textContent)
	},
	render() {
		let gameTitle = React.createElement('h1', {className: 'view-title'},
			React.createElement(ContentEditable, {
				className: 'game-title',
				text: this.props.title,
				ref: 'title',
				onEnter: this.saveGame,
		}))

		let playerCountry = React.createElement('div', {className: 'player-country'})

		return React.createElement('div', {id: 'game-header'},
			gameTitle,
			playerCountry
		)
	},
})

export default GameHeader
