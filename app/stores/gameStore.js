import * as _ from 'lodash'
import * as Reflux from 'reflux'
import gameActions from '../actions/gameActions'
import userStore from './userStore'
import {Game} from '../models/game'

let gameStore = Reflux.createStore({
	listenables: gameActions,

	init() {
		this.games = [];

		this.listenTo(userStore, this._updateDataFromParse, this._updateDataFromParse);
		this.user = null;
	},

	_updateDataFromParse(user) {
		console.log(user)
		if (this.user === null)
			this.user = _.isUndefined(user) ? this.user : user
		let allGames = new Parse.Query(Game)
		allGames.find()
			.then(results => {
				this.games = _.sortBy(results, (game) => game.get('updatedAt'))
				console.log('games', this.games)
				this.trigger(this.games)
			})
	},

	getInitialState() {
		return this.games;
	},

	updateGameList() {
		console.log('updateGameList')
		this._updateDataFromParse()
	},

	createGame(options) {
		let game = new Game()
		game.set('title', options.title || 'Untitled Game')
		game.set('owner', {__type: 'Pointer', className: '_User', objectId: options.owner})
		game.set('players', JSON.parse(options.players))
		game.set('mapId', {__type: 'Pointer', className: 'Map', objectId: JSON.parse(options.mapId).objectId})
		game.set('countriesToPlayers', options.countriesToPlayers)
		game.set('settings', options.settings)
		game.save()
			.then(this._updateDataFromParse, (error) => {console.log(error)})
	},

	destroyGame(gameId) {
		let gameToDestroy = _.find(this.games, {id: gameId})
		gameToDestroy.destroy()
			.then(this._updateDataFromParse)
	},

	makeMove() {},

	submitOrders(gameId, turnObject) {
		console.log('submitOrders', gameId, turnObject)
		let game = _.find(this.games, {id: gameId})

		let previousPhases = game.get('turnPhases')
		let phases = previousPhases.concat(turnObject)
		game.set('turnPhases', phases)
		game.save()
			.then(this._updateDataFromParse)
	},

	editGame(gameId, key, value) {
		let game = _.find(this.games, (g) => g.id === gameId)
		game.set(key, value)
		game.save()
			.then(this._updateDataFromParse)
	},

	editGameOwner(gameId, newOwner) {
		let game = _.find(this.games, (g) => g.id === gameId)
		game.set('owner', newOwner)
		game.save()
			.then(this._updateDataFromParse)
	},

	editGameTitle(gameId, newTitle) {
		console.log('editGameTitle', gameId, newTitle)
		let game = _.find(this.games, (g) => g.id === gameId)
		game.set('title', newTitle)
		game.save()
			.then(() => {console.log('updated game title')})
			.then(this._updateDataFromParse)
	},

	removePlayerFromGame(gameId, playerId) {
		let game = _.find(this.games, (g) => g.id === gameId)
		let players = game.get('players')
		let removedPlayers = _.remove(players, (player) => player === playerId)
		game.set('players', players)
		game.save()
			.then(this._updateDataFromParse)
	},

	addPlayerToGame(gameId, playerId) {
		let game = _.find(this.games, (g) => g.id === gameId)
		let players = game.get('players')
		players.push(playerId)
		game.set('players', players)
		game.save()
			.then(this._updateDataFromParse)
	},

	editGameMap(gameId, newMapId) {
		let game = _.find(this.games, (g) => g.id === gameId)
		game.set('mapId', newMapId)
		game.save()
			.then(this._updateDataFromParse)
	},
})

export default gameStore
