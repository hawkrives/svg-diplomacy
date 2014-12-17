import * as React from 'react'
import * as _ from 'lodash'

import gameActions from '../actions/gameActions'

let Orders = React.createClass({
	submitOrders () {
		gameActions.submitOrders(this.props.gameId, this.props.pendingOrders)
	},
	render() {
		let orderDialogue = React.createElement('div', {id: 'order-text'},
			'Order Dialogue Here',
			_.map(this.props.pendingOrders, (order) => React.createElement('li', {key: order.at}, JSON.stringify(order, null, 2))))
		let submitOrders = React.createElement('button', {className: 'order-button', onClick: this.submitOrders}, 'Submit Orders')

		return React.createElement('div', {id: 'game-orders'}, orderDialogue, submitOrders)
	},
})

export default Orders
