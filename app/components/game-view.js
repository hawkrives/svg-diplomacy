import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State} from 'react-router'

import gameActions from '../actions/gameActions'

import RenderedMap from './rendered-map'
import Orders from './game-orders'
import Settings from './game-settings'
import Timeline from './game-timeline'
import GameJoin from './game-join'
import GameChatlist from './game-chatlist'

let GameView = React.createClass({
	mixins: [State],
	render() {
		let turnPhasesLength = this.props.game.get('turnPhases') ? this.props.game.get('turnPhases').length : 1
		let joinedPlayers = this.props.game.get('players') ? this.props.game.get('players') : undefined
		let maxPlayers = this.props.map ? this.props.map.players : 1
		let gameId = this.props.game.id ? this.props.game.id : undefined

		// All possible components for the game (make sure these have keys)
		let map = React.createElement(RenderedMap, {key: 'map', game: this.props.game, map: this.props.map})
		let orders = React.createElement(Orders, {key: 'orders'})
		let chat = React.createElement(GameChatlist, {key: 'chat'});
		let timeline = React.createElement(Timeline, {key: 'timeline', length: turnPhasesLength})
		let settings = React.createElement(Settings, {key: 'settings', game: this.props.game})
		let join = React.createElement(GameJoin, {key: 'join', maxPlayers: maxPlayers, joinedPlayers: joinedPlayers, userId: this.props.user.id, gameId: gameId});
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

export default GameView