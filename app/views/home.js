import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import userStore from '../stores/userStore'

import GameList from '../components/game-list'

let gameObjects = [
	{
		id: 'kfj309fj20j0asdadas',
		owner: '123j33dcj0',
		players: ['983nf01laa', '123j33dcj0'],
		map: {name: 'Northfield', id: '91dj2091'},
		title: 'Diplomacy is Dead',
		moves: [
			{user: '8WswhCVIse', from: 'St. Olaf', to: 'Naturalands'},
			{user: '123j33dcj0', from: 'Carleton', to: 'The Arb'},
		],
	},
	{
		id: 'sdywf9874ia8hos9290',
		owner: '8WswhCVIse',
		players: ['8WswhCVIse', '983nf01laa', '123j33dcj0'],
		map: {name: 'Europe', id: '91nf8932'},
		title: 'STOLAF DOMINATES EUROPE!',
		moves: [{user: '8WswhCVIse', from: 'Paris', to: 'Burgandy'}],
	},
	{
		id: '892bw2f39h08ehf2332',
		owner: '123j33dcj0',
		players: ['8WswhCVIse', '123j33dcj0'],
		map: {name: 'Northfield', id: '91dj2091'},
		title: 'CARLETON vs STOLAF!',
		moves: [
			{user: '8WswhCVIse', from: 'St. Olaf', to: 'Naturalands'},
			{user: '123j33dcj0', from: 'Carleton', to: 'The Arb'},
		],
	},
]

let Home = React.createClass({
	mixins: [Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged')],
	onUserChanged(user) {
		this.setState({user})
	},
	getInitialState() {
		return { user: undefined }
	},
	render() {
		let allGames = React.createElement(GameList, {title: 'All Games', games: gameObjects})

		let myGames, myGameObjects;
		if (this.state.user) {
			myGameObjects = _.filter(gameObjects, (game) => _.contains(game.players, this.state.user.id))
			myGames = React.createElement(GameList, {title: 'My Games', games: myGameObjects})
		}

		return React.createElement('div', {id: 'home'},
			myGames,
			allGames)
	}
})

export default Home
