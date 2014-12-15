import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State} from 'react-router'

import RenderedMap from './map'
import Orders from '../components/game/orders'
import Settings from '../components/game-settings'
import Timeline from '../components/game/timeline'
import gameActions from '../actions/gameActions'
import GameNavbar from '../components/game/game-nav'
import ContentEditable from '../components/content-editable'

import gameActions from '../actions/gameActions'

let GameHeader = React.createClass({
	render() {
		let gameTitle = React.createElement('h1', {className: 'view-title'},
			React.createElement(ContentEditable, {
				className: 'game-title',
				text: this.props.title,
				onInput: this.updateGameTitle,
				onEnter: this.saveGame,
		}))

		let playerCountry = React.createElement('div', {className: 'player-country'})

		return React.createElement('div', {id: 'game-header'},
			gameTitle,
			playerCountry
		)
	},
})

let GameView = React.createClass({
	mixins: [State],
	render() {
		// All possible components for the game (make sure these have keys)
		let map = React.createElement(RenderedMap, {key: 'map', game: this.props.game, map: this.props.map})
		let orders = React.createElement(Orders, {key: 'orders'})
		let chat;
		let timeline = React.createElement(Timeline)
		let settings = React.createElement(Settings, {game: this.props.game})
		let join;
		let resign;

		// Logic to render specific components
		let views = []
		let gameStatus = this.props.game.get('status')

		if (this.getQuery().section === 'board') {
			if (gameStatus === 'preGame') {
				views = [map, join]
			}
			else if (gameStatus === 'active') {
				views = [map, orders]
			}
		}
		else if (this.getQuery().section === 'chat') {
			views = [chat]
		}
		else if (this.getQuery().section === 'history') {
			views = [map, timeline]
		}
		else if (this.getQuery().section === 'info') {
			if (gameStatus === 'preGame') {
				views = [settings, join]
			}
			else if (gameStatus === 'active') {
				views = [settings, resign]
			}
			else if (gameStatus === 'completed') {
				views = [settings]
			}
		}

		return React.createElement('div', {id: 'game-view'}, views)
	},
})

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
	saveGame() {
		console.log('saving', this.state.game.id)
		this.state.game.save()
			.then((result) => console.log('game saved', result))
			.then(gameActions.updateGameList)
	},
	updateGameTitle(ev) {
		// console.log(ev.target.textContent)
		this.state.game.set('title', ev.target.textContent)
	},
	render() {
		if (this.state.loading)
			return React.createElement('h1', {className: 'view-title'}, 'Loading Game...')

		let gameHeader, gameView, gameNavbar;
		if (this.state.game) {
			gameHeader = React.createElement(GameHeader, {title: this.state.game.get('title')})
			gameView = React.createElement(GameView, {game: this.state.game, map: this.state.map})
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
