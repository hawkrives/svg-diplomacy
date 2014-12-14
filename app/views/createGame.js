import * as React from 'react'
import * as _ from 'lodash'
import gameActions from '../actions/gameActions'
import DetailedListItem from '../components/detailed-list-item'

let GameListItem = React.createClass({
	destroyGame(ev) {
		ev.preventDefault()
		gameActions.destroyGame(this.props.info.id)
	},
	render() {
		return React.createElement(DetailedListItem, {info: this.props.info, buttonClick: this.destroyGame})
	},
})

let CreateGame = React.createClass({
	createGame(ev) {
		ev.preventDefault()

		if (!this.props.user)
			return;

		let title = this.refs.title.getDOMNode().value
		let owner = this.props.user.id
		let players = this.refs.players.getDOMNode().value
		let mapId = this.refs.mapId.getDOMNode().value

		gameActions.createGame({title, owner, players, mapId})
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Start a Game')

		let listOfGames = React.createElement('ul',
			{className: 'raw-list'},
			_.map(this.props.games, (game) => React.createElement(GameListItem, {key: game.id, info: game})))

		let gameCreationForm = React.createElement('form', {className: 'game-creation-form', onSubmit: this.createGame},
			React.createElement('label', null, 'Title: ', React.createElement('input', {type: 'text', ref: 'title', placeholder: 'Game Title'})),
			React.createElement('label', null, 'Players: ', React.createElement('input', {type: 'text', ref: 'players', placeholder: 'Who\'s Playing'})),
			React.createElement('label', null, 'Map ID: ', React.createElement('input', {type: 'text', ref: 'mapId', placeholder: 'Which Map'})),
			React.createElement('input', {type: 'submit', value: 'Create new game'}))

		return React.createElement('div',
			{id: 'create-game'},
			title,
			listOfGames,
			gameCreationForm)
	},
})

export default CreateGame
