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
])

export default gameActions
