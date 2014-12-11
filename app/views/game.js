import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State} from 'react-router'
import RenderedMap from './map'
import gameActions from '../actions/gameActions'
import ContentEditable from '../components/content-editable'

let Game = React.createClass({
	mixins: [State],
	componentWillReceiveProps(nextProps) {
		let gameId = this.getParams().gameId
		let game = _.find(nextProps.games, {id: gameId})
		if (game) {
			let mapId = game.get('mapId')
			if (mapId) {
				console.log('map', nextProps.maps)
				let map = _.find(nextProps.maps, (map) => {
					return map.id === mapId.id
				})
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

		return React.createElement('div',
			{id: 'game'},
			title,
			errorView,
			map)
	},
})

export default Game
