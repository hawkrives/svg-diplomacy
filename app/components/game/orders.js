import * as React from 'react'

import gameActions from '../../actions/gameActions'

let Orders = React.createClass({
	submitOrders () {
		gameActions.submitOrders()
	},
	render() {
		let orderDialogue = React.createElement('div', {id: 'order-text'}, 'Order Dialogue Here')
		let submitOrders = React.createElement('button', {onClick: this.submitOrders}, 'Submit Orders')

		return React.createElement('div', {id: 'game-orders'}, orderDialogue, submitOrders)
	},
})

export default Orders
