import * as React from 'react'
import {currentUser} from '../helpers/auth'
import GameList from '../components/game-list'

let gameObjects = [
	{
		id: 'sdywf9874ia8hos9290',
		owner: '8WswhCVIse',
		players: ['hawkrives', 'heroine', 'dominator'],
		mapName: 'Europe',
		mapId: '91nf8932',
		title: 'STOLAF DOMINATES EUROPE!',
		moves: [{user: '91nf8932', from: 'Paris', to: 'Burgandy'}],
	}
]

let Home = React.createClass({
	render() {
		let allGames = React.createElement(GameList, {title: 'All Games', games: gameObjects})
		let myGames = React.createElement(GameList, {title: 'My Games', games: gameObjects, filter: {owner: currentUser().id}})

		return React.createElement('div', {id: 'home'},
			myGames,
			allGames)
	}
})

export default Home
