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
		this.user = _.isUndefined(user) ? this.user : user;
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

	createGame(title, owner, players, mapId, countriesToPlayers) {
		let game = new Game()
		game.set('title', title || 'Untitled Game')
		game.set('owner', owner)
		game.set('players', players)
		game.set('mapId', mapId)
		game.set('countriesToPlayers', countriesToPlayers)

		game.save()
			.then(this._updateDataFromParse)
	},

	makeMove() {},

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
		let game = _.find(this.games, (g) => g.id === gameId)
		game.set('title', newTitle)
		game.save()
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
