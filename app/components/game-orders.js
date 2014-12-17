import * as React from 'react'
import * as _ from 'lodash'

import gameActions from '../actions/gameActions'

let Orders = React.createClass({
	submitOrders () {
		gameActions.submitOrders(this.props.game.id, {player: this.props.userId, orders: this.props.pendingOrders})
	},
	render() {
		let orderDialogue = React.createElement('div', {id: 'order-text'},
			this.props.pendingOrders.length ? null : 'Order Dialogue Here',
			_.map(this.props.pendingOrders, (order) => {
				let orderMessage = 'The unit at ' + (_.find(this.props.map.spaces, {id: order.at}) ? _.find(this.props.map.spaces, {id: order.at}).name : null) + ' ' + order.type
				if (order.hasOwnProperty('from')) {
					orderMessage += ' from ' + (_.find(this.props.map.spaces, {id: order.from}) ? _.find(this.props.map.spaces, {id: order.from}).name : null)
				}
				if (order.hasOwnProperty('to')) {
					if (order.type === 'support-hold') {
						orderMessage += ' the unit in ' + (_.find(this.props.map.spaces, {id: order.to}) ? _.find(this.props.map.spaces, {id: order.to}).name : null)
					}
					else {
						orderMessage += ' to ' + (_.find(this.props.map.spaces, {id: order.to}) ? _.find(this.props.map.spaces, {id: order.to}).name : null)
					}
				}
				return React.createElement('li', {key: order.id}, orderMessage)
			}))
		let submitOrders = React.createElement('button', {className: 'order-button', onClick: this.submitOrders}, 'Submit Orders')

		return React.createElement('div', {id: 'game-orders'}, orderDialogue, submitOrders)
	},
})

export default Orders
