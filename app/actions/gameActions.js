import * as Reflux from 'reflux'

let gameActions = Reflux.createActions([
	'updateGameList',
	'createGame',
	'makeMove',
	'submitOrders',
	'editGame',
	'editGameOwner',
	'editGameTitle',
	'editGamePlayers',
	'editGameMap',
	'removePlayerFromGame',
	'addPlayerToGame',
	'endGame',
	'destroyGame',
])

window.actions = window.actions || {}
window.actions.gameActions = gameActions

export default gameActions
