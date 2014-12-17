import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State} from 'react-router'

import RenderedMap from '../components/rendered-map'
import GameNavbar from '../components/game-nav'
import GameView from '../components/game-view'
import GameHeader from '../components/game-header'

let Game = React.createClass({
	mixins: [State],
	componentWillReceiveProps(nextProps) {
		let gameId = this.getParams().gameId
		let game = _.find(nextProps.games, {id: gameId})
		if (game) {
			let mapId = game.get('mapId')
			if (mapId) {
				let map = _.find(nextProps.maps, (map) => map.id === mapId.id)
				this.setState({game, map, loading: false, error: ''})
			}
			else {
				this.setState({error: `couldn't find map ${mapId}`})
			}
		}
		else {
			this.setState({error: `couldn't find game ${gameId}`})
		}
	},
	componentWillMount() {
		this.componentWillReceiveProps(this.props)
	},
	getInitialState() {
		return {
			game: null,
			map: null,
			error: null,
			loading: true,
		}
	},
	render() {
		if (this.state.loading)
			return React.createElement('h1', {className: 'view-title'}, 'Loading Game...')

		let gameHeader, gameView, gameNavbar;
		if (this.state.game) {
			let playerCountryName = _.find(this.state.game.get('countriesToPlayers'), {player: this.props.user.id})
			playerCountryName = playerCountryName ? playerCountryName.country : ''
			let playerCountry = _.find(this.state.map ? this.state.map.countries : [], {name: playerCountryName})
			let tintColor = playerCountry ? playerCountry.occupiedColor : 'black'
			gameHeader = React.createElement(GameHeader,
				{title: this.state.game.get('title'), gameId: this.state.game.id, playerCountry: playerCountryName, tint: tintColor})
			gameView = React.createElement(GameView, {game: this.state.game, map: this.state.map, user: this.props.user})
			gameNavbar = React.createElement(GameNavbar, {params: this.getParams(), status: this.state.game.get('status')})
		}
		else {
			gameView = React.createElement('p', {className: 'error'}, this.state.error)
		}

		return React.createElement('div',
			{id: 'game'},
			gameHeader,
			gameView,
			gameNavbar)
	},
})

export default Game
