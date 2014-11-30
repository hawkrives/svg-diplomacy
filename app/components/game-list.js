import * as React from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router'
import Subtitle from './subtitle'
import Octicon from './octicon'

let GameList = React.createClass({
	propTypes: {
		games: React.PropTypes.array.isRequired,
		title: React.PropTypes.string.isRequired,
	},

	render() {
		let title = React.createElement(Subtitle, {text: this.props.title});

		let listOfGames = React.createElement('ul', null, _.map(this.props.games, (game) =>
			React.createElement('li', {key: game.id},
				React.createElement(Link, {to: 'game', params: {gameId: game.id}},
					React.createElement('span', {className: 'game-title'}, game.title),
					React.createElement('span', {className: 'map-name'}, game.map.name),
					React.createElement(Octicon, {icon: 'chevron-right'})))))

		let noGamesMessage = "No games available."

		return React.createElement('section', {className: 'game-list'},
			title,
			_.isEmpty(listOfGames) ? noGamesMessage : listOfGames)
	}
})

export default GameList
