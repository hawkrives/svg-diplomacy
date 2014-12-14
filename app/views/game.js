import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State, Link as LinkClass} from 'react-router'
import {Octicon as OcticonClass} from '../components/octicon'
import RenderedMap from './map'
import gameActions from '../actions/gameActions'
import ContentEditable from '../components/content-editable'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

// Right now this toolbar has separate links to the items, but it should be more like tabs than links in the future
let GameNavbar = React.createClass({
	mixins: [State],
	render() {
		console.log('query', this.getQuery().section)
		return React.createElement('ul', {id: 'game-nav', className: 'menu'},
			Link({to: `game`, params: {gameId: this.getParams().gameId}, query: {section: 'board'}}, React.createElement('li', {key: 'board'},	Octicon({icon: 'globe'}))),
			Link({to: `game`, params: {gameId: this.getParams().gameId}, query: {section: 'chat'}}, React.createElement('li', {key: 'chat'},	Octicon({icon: 'comment-discussion'}))),
			Link({to: `game`, params: {gameId: this.getParams().gameId}, query: {section: 'history'}}, React.createElement('li', {key: 'history'},	Octicon({icon: 'clock'}))),
			Link({to: `game`, params: {gameId: this.getParams().gameId}, query: {section: 'info'}}, React.createElement('li', {key: 'info'},	Octicon({icon: 'gear'})))
		)
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
		let gameTitle;
		if (this.state.loading)
			gameTitle = 'Loading...'
		if (this.state.game)
			gameTitle = this.state.game.get('title')

		let gameTitleComponent = React.createElement(ContentEditable, {
			className: 'game-title',
			text: gameTitle,
			onInput: this.updateGameTitle,
			onEnter: this.saveGame,
		})

		let title = React.createElement('h1', {className: 'view-title'}, 'Active Game: ', gameTitleComponent)

		let map;
		if (this.state.map)
			map = React.createElement(RenderedMap, {map: this.state.map})

		let errorView = React.createElement('div',
			{className: 'error'},
			this.state.error)

		let gameNavbar = React.createElement(GameNavbar);

		return React.createElement('div',
			{id: 'game'},
			title,
			errorView,
			map,
			gameNavbar)
	},
})

export default Game
