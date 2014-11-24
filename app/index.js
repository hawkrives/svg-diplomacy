import * as React from 'react'
import * as Router from 'react-router'
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
// import {Route, DefaultRoute} from 'react-router'

import App from './views/app'
import Home from './views/home'
import Game from './views/game'
import Profile from './views/profile'
import Search from './views/search'
import Help from './views/help'
import Create from './views/create'

let routes = (
	React.createElement(Route, {handler: App, name: 'App', path: "/"},
		React.createElement(DefaultRoute, {handler: Home, name: 'Home'}),
		React.createElement(Route, {handler: Game, name: 'Game'}),
		React.createElement(Route, {handler: Profile, name: 'Profile'}),
		React.createElement(Route, {handler: Search, name: 'Search'}),
		React.createElement(Route, {handler: Help, name: 'Help'}),
		React.createElement(Route, {handler: Create, name: 'Create'})))

Router.run(routes, (Handler) => {
	React.render(React.createElement(Handler, null), document.getElementById('app'))
})
