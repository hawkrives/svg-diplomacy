import * as React from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router'
import RenderedMap from './rendered-map'
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
			React.createElement('li', {className: 'game-item', key: game.id},
				React.createElement(RenderedMap, {className: 'game-background', mapId: game.get('mapId'), maps: this.props.maps, game: game}),
				React.createElement(Link, {to: 'game', params: {gameId: game.id}, query: {section: 'board'}, className: 'game-info'}, game.get('title')))))

		let noGamesMessage = 'No games available.'

		return React.createElement('section', {className: 'game-list'},
			title,
			_.isEmpty(listOfGames) ? noGamesMessage : listOfGames)
	},
})

export default GameList
