import * as Reflux from 'reflux'
import gameActions from '../actions/gameActions'

let gameStore = Reflux.createStore({
	listenables: gameActions,

	init() {
		this.games = [
			{
				id: 'kfj309fj20j0asdadas',
				title: 'Diplomacy is Dead',
				owner: '123j33dcj0',
				players: ['983nf01laa', '123j33dcj0'],
				mapId: '91dj2091',
				countriesToPlayers: [
					{country: 'Germany', player: '983nf01laa'},
					{country: 'France', player: '123j33dcj0'},
				],
				armies: [
					{player: '983nf01laa', armyId: 1, location: 0, type: 'land'},
					{player: '123j33dcj0', armyId: 0, location: 1, type: 'sea'},
				],
				turnPhases: [
					{
						player: '983nf01laa',
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
				players: ['8WswhCVIse', '983nf01laa', '123j33dcj0'],
				mapId: '91nf8932',
				countriesToPlayers: [
					{country: 'Germany', player: '983nf01laa'},
					{country: 'France', player: '123j33dcj0'},
					{country: 'England', player: '8WswhCVIse'},
				],
				armies: [
					{player: '8WswhCVIse', armyId: 1, location: 0, type: 'land'},
					{player: '123j33dcj0', armyId: 0, location: 1, type: 'sea'},
					{player: '983nf01laa', armyId: 2, location: 2, type: 'land'},
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
				owner: '123j33dcj0',
				players: ['8WswhCVIse', '123j33dcj0'],
				mapId: '91dj2091',
				countriesToPlayers: [
					{country: 'Carleton', player: '8WswhCVIse'},
					{country: 'St. Olaf', player: '123j33dcj0'},
				],
				armies: [
					{player: '8WswhCVIse', armyId: 1, location: 0, type: 'land'},
					{player: '123j33dcj0', armyId: 0, location: 1, type: 'sea'},
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
		];
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
