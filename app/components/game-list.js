import * as React from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router'
import Subtitle from './subtitle'

let GameList = React.createClass({
	propTypes: {
		games: React.PropTypes.array.isRequired,
		title: React.PropTypes.string.isRequired,
		filter: React.PropTypes.object,
		reject: React.PropTypes.object,
	},

	render() {
		let title = React.createElement(Subtitle, {text: this.props.title});

		let games = this.props.games

		if (this.props.filter || this.props.reject) {
			games = _.chain(this.props.games)
				.filter(this.props.filter)
				.reject(this.props.reject || {})
				.value()
		}

		let listOfGames = _.map(games, (game) =>
			React.createElement('li', {key: game.id},
				React.createElement(Link, {to: 'game', params: {gameId: game.id}}, game.title)))

		let noGamesMessage = "No games available."

		return React.createElement('section', {className: 'game-list'},
			title,
			React.createElement('ul', null, _.isEmpty(listOfGames) ? noGamesMessage : listOfGames ))
	}
})

export default GameList
