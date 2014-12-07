import * as _ from 'lodash'
import * as Reflux from 'reflux'
import gameActions from '../actions/gameActions'
import userStore from './userStore'

let gameStore = Reflux.createStore({
	listenables: gameActions,

	init() {
		this.games = [];

		this.listenTo(userStore, this._updateGameListFromParse, this._updateGameListFromParse);
	},

	_updateGameListFromParse(user) {
		let Game = Parse.Object.extend('Game')
		let allGames = new Parse.Query(Game)
		allGames.find()
			.then(results => {
				this.games = _.sortBy(results, game => game.get('updatedAt'))
				this.trigger(this.games)
			})
	},

	getInitialState() {
		return this.games;
	},

	createGame() {},
	makeMove() {},
	editGame(gameId, key, value) {},
	editGameOwner(gameId, newOwner) {},
	editGameTitle(gameId, newTitle) {},
	editGamePlayers(gameId, newPlayers) {},
	removePlayerFromGame(gameId, playerId) {},
	addPlayerToGame(gameId, playerId) {},
	editGameMap(gameId, newMap) {},
})

export default gameStore
