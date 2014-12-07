import * as Reflux from 'reflux'

let gameActions = Reflux.createActions([
	'createGame',
	'makeMove',
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

export default gameActions
