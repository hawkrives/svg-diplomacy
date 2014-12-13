import * as React from 'react'
import * as Reflux from 'reflux'
import {RouteHandler, State, Link, Navigation} from 'react-router'

import userStore from '../stores/userStore'
import gameStore from '../stores/gameStore'
import mapStore from '../stores/mapStore'

import Header from '../components/header'

let App = React.createClass({
	mixins: [
		State,
		Navigation,
		Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged'),
		Reflux.listenTo(gameStore, 'onGameChanged', 'onGameChanged'),
		Reflux.listenTo(mapStore,  'onMapChanged',  'onMapChanged'),
	],
	onUserChanged(user) {
		console.log('app.onUserChanged')
		this.setState({user, userInitialized: true})
	},
	onGameChanged(games) {
		console.log('app.onGameChanged')
		this.setState({games})
	},
	onMapChanged(maps) {
		console.log('app.onMapChanged')
		this.setState({maps})
	},
	getInitialState() {
		return {
			user: null,
			userInitialized: false,
			maps: [],
			games: [],
		}
	},
	render() {
		let isOnSignPage = (this.getPathname() === '/sign-in' || this.getPathname() === '/sign-up' || this.getPathname() === '/sign-in/reset-password')
		if (!this.state.user && this.state.userInitialized && !isOnSignPage) {
			console.log('redirecting to sign-in');
			this.replaceWith('/sign-in');
		}
		return React.createElement('div', {className: 'app'},
			React.createElement(Header, {user: this.state.user}),
			React.createElement('main', null,
				React.createElement(RouteHandler,
					{maps: this.state.maps, user: this.state.user, games: this.state.games})))
	},
})

export default App
