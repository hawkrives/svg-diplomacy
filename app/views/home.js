import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'

import GameList from '../components/game-list'

let Home = React.createClass({
	componentWillReceiveProps: function(nextProps) {
		if (this.props.games && this.props.user) {
			this.setState({loading: false})
		}
	},
	componentWillMount: function() {
		this.componentWillReceiveProps(this.props)
	},
	getInitialState() {
		return {
			loading: true
		}
	},
	render() {
		if (this.state.loading)
			return React.createElement('div', {id: 'home'}, 'Loading...')

		let allGames;
		let myGames;
		if (this.props.user) {
			let myGameObjects = _.filter(this.props.games, (game) => _.contains(game.get('players'), this.props.user.id))
			myGames = React.createElement(GameList, {title: 'My Games', games: myGameObjects, maps: this.props.maps})
			let allButMyGameObjects = _.reject(this.props.games, (game) => _.contains(game.get('players'), this.props.user.id))
			allGames = React.createElement(GameList, {title: 'All Games', games: allButMyGameObjects, maps: this.props.maps})
		}

		return React.createElement('div', {id: 'home'},
			myGames,
			allGames)
	},
})

export default Home
