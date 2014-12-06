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
		console.log(user)
		this.games = [
			{
				id: 'kfj309fj20j0asdadas',
				title: 'Diplomacy is Dead',
				owner: 'gewPWc854D',
				players: ['SiwpaxZp1i', 'gewPWc854D'],
				mapId: '91dj2091',
				countriesToPlayers: [
					{country: 'Germany', player: 'SiwpaxZp1i'},
					{country: 'France', player: 'gewPWc854D'},
				],
				armies: [
					{player: 'SiwpaxZp1i', armyId: 1, location: 0, type: 'land'},
					{player: 'gewPWc854D', armyId: 0, location: 1, type: 'sea'},
				],
				turnPhases: [
					{
						player: 'SiwpaxZp1i',
						orders: [
							{
								armyId: 1,
								type: 'land',
								at: 0,
								to: 1,
								from: null,
							}
						]
					}
				]
			},
			{
				id: 'sdywf9874ia8hos9290',
				title: 'STOLAF DOMINATES EUROPE!',
				owner: '8WswhCVIse',
				players: ['8WswhCVIse', 'SiwpaxZp1i', 'gewPWc854D'],
				mapId: '91nf8932',
				countriesToPlayers: [
					{country: 'Germany', player: 'SiwpaxZp1i'},
					{country: 'France', player: 'gewPWc854D'},
					{country: 'England', player: '8WswhCVIse'},
				],
				armies: [
					{player: '8WswhCVIse', armyId: 1, location: 0, type: 'land'},
					{player: 'gewPWc854D', armyId: 0, location: 1, type: 'sea'},
					{player: 'SiwpaxZp1i', armyId: 2, location: 2, type: 'land'},
				],
				turnPhases: [
					{
						player: '8WswhCVIse',
						orders: [
							{
								armyId: 1,
								type: 'land',
								at: 0,
								to: 1,
								from: null,
							}
						]
					}
				]
			},
			{
				id: '892bw2f39h08ehf2332',
				title: 'CARLETON vs STOLAF!',
				owner: 'gewPWc854D',
				players: ['8WswhCVIse', 'gewPWc854D'],
				mapId: '91dj2091',
				countriesToPlayers: [
					{country: 'Carleton', player: '8WswhCVIse'},
					{country: 'St. Olaf', player: 'gewPWc854D'},
				],
				armies: [
					{player: '8WswhCVIse', armyId: 1, location: 0, type: 'land'},
					{player: 'gewPWc854D', armyId: 0, location: 1, type: 'sea'},
				],
				turnPhases: [
					{
						player: '8WswhCVIse',
						orders: [
							{
								armyId: 1,
								type: 'land',
								at: 0,
								to: 1,
								from: null,
							}
						]
					}
				]
			},
		]
		if (!user)
			this.games = []
		this.trigger(this.games)
	},

	getInitialState() {
		return this.games;
	},

	createGame() {

	},
	makeMove() {

	},
	editGame(gameId, key, value) {

	},
	editGameOwner(gameId, newOwner) {

	},
	editGameTitle(gameId, newTitle) {

	},
	editGamePlayers(gameId, newPlayers) {

	},
	removePlayerFromGame(gameId, playerId) {

	},
	addPlayerToGame(gameId, playerId) {

	},
	editGameMap(gameId, newMap) {

	},
})

export default gameStore
