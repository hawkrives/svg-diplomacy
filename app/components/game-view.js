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

let turnPhaseOrderIndex = 0

let GameView = React.createClass({
	mixins: [State],

	onNewOrder(move) {
		move.id = turnPhaseOrderIndex++
		let order = move
		let prevOrder = _.find(this.state.pendingOrders, {armyId: order.armyId});
		if (prevOrder === undefined) {
			prevOrder = {at: order.at, to: order.at}
		}
		this.setState({pendingOrders: _(this.state.pendingOrders)
			.reject({armyId: order.armyId})
			.reject({to: prevOrder.at})
			.reject({to: prevOrder.to})
			.concat(order)
			.value()
		})
	},

	removeDependentMoves(pendingOrders, order) {
		return _(pendingOrders)
			.reject({to: order.at})
			.reject({from: order.at})
	},

	getInitialState() {
		return {
			pendingOrders: []
		}
	},

	render() {
		let turnPhasesLength = this.props.game.get('turnPhases') ? this.props.game.get('turnPhases').length : 1
		let joinedPlayers = this.props.game.get('players')
		let maxPlayers = this.props.map ? this.props.map.players : 1
		let gameId = this.props.game.id

		// All possible components for the game (make sure these have keys)
		let map      = React.createElement(RenderedMap, {key: 'map', game: this.props.game, map: this.props.map, user: this.props.user, onNewOrder: this.onNewOrder, pendingOrders: this.state.pendingOrders})
		let orders   = React.createElement(Orders, {key: 'orders', pendingOrders: this.state.pendingOrders, game: this.props.game, map: this.props.map, userId: this.props.user.id})
		let chat     = React.createElement(GameChatlist, {key: 'chat'});
		let timeline = React.createElement(Timeline, {key: 'timeline', length: turnPhasesLength})
		let settings = React.createElement(Settings, {key: 'settings', game: this.props.game})
		let join     = React.createElement(GameJoin, {key: 'join', maxPlayers: maxPlayers, joinedPlayers: joinedPlayers, userId: this.props.user.id, gameId: gameId})
		let resign;

		// Logic to render specific components
		let views = []
		let gameStatus = this.props.game.get('status')

		let query = this.getQuery()
		if (query.section === 'board') {
			if (gameStatus === 'preGame') {
				views = [map, join]
			}
			else if (gameStatus === 'active') {
				let isInGame = _.contains(this.props.game.get('players'), this.props.user.id)
				views = [map, isInGame ? orders : null]
			}
		}
		else if (query.section === 'chat') {
			views = [chat]
		}
		else if (query.section === 'history') {
			views = [map, timeline]
		}
		else if (query.section === 'info') {
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
