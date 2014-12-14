import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import gameActions from '../actions/gameActions'

let GameListItem = React.createClass({
	destroyGame(ev) {
		ev.preventDefault()
		gameActions.destroyGame(this.props.game.id)
	},
	render() {
		let components = _.map(this.props.game.attributes || this.props.map, (value, key) => {
			let val = JSON.stringify(value, null, 2)
			val = val ? val.substring(0, 50) : val

			if (key === 'id' || key === 'get')
				return null

			return React.createElement('div', {key: key}, key, ': ', val)
		})

		components.unshift(React.createElement('div', {key: 'id'}, ': ', this.props.game.id))

		components.push(React.createElement('button', {onClick: this.destroyGame, key: 'deleteButton'}, 'Delete Game'))

		return React.createElement('li', {className: 'one-game'}, components)
	},
})

let CreateGame = React.createClass({
	createGame(ev) {
		ev.preventDefault()

		let title = this.refs.title.getDOMNode().value
		let owner = this.refs.owner.getDOMNode().value
		let players = this.refs.players.getDOMNode().value
		let mapId = this.refs.mapId.getDOMNode().value
		let countriesToPlayers = this.refs.countriesToPlayers.getDOMNode().value

		players = parseInt(players, 10)

		gameActions.createGame(title, owner, players, mapId, countriesToPlayers)
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New Game')

		let listOfGames = React.createElement('ul',
			{className: 'raw-game-list'},
			_.map(this.props.games, (game) => React.createElement(GameListItem, {key: game.id, game: game})))

		let gameCreationForm = React.createElement('form', {className: 'map-creation-form', onSubmit: this.createMap},
			React.createElement('label', null, 'Title: ', React.createElement('input', {type: 'text', ref: 'title', placeholder: 'Game Title'})),
			React.createElement('label', null, 'Owner: ', React.createElement('input', {type: 'text', ref: 'owner', placeholder: 'ownerId'})),
			React.createElement('label', null, 'Players: ', React.createElement('input', {type: 'text', ref: 'players', placeholder: '[playerIds]'})),
			React.createElement('label', null, 'Map ID: ', React.createElement('input', {type: 'text', ref: 'mapId', placeholder: 'mapId'})),
			React.createElement('label', null, 'Countries To Players: ', React.createElement('input', {type: 'text', ref: 'countriesToPlayers', placeholder: '[{country: "Country", player: "playerId"}]'})),
			React.createElement('input', {type: 'submit', value: 'Create new game'}))

		return React.createElement('div',
			{id: 'create'},
			title,
			listOfGames,
			gameCreationForm)
	},
})

export default CreateGame
