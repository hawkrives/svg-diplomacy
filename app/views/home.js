import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'

import userStore from '../stores/userStore'
import gameStore from '../stores/gameStore'

import GameList from '../components/game-list'

let Home = React.createClass({
	mixins: [
		Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged'),
		Reflux.listenTo(gameStore, 'onGameChanged', 'onGameChanged'),
	],
	onUserChanged(user) {
		this.setState({user})
	},
	onGameChanged(games) {
		this.setState({games})
	},
	getInitialState() {
		return { user: undefined, games: [] }
	},
	render() {
		let allGames = React.createElement(GameList, {title: 'All Games', games: this.state.games})

		let myGames;
		if (this.state.user) {
			let myGameObjects = _.filter(this.state.games, (game) => _.contains(game.get('players'), this.state.user.id))
			myGames = React.createElement(GameList, {title: 'My Games', games: myGameObjects})
		}

		return React.createElement('div', {id: 'home'},
			myGames,
			allGames)
	},
})

export default Home
