// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import * as keys from './data/parse-api-key.json'
Parse.initialize(keys.app_id, keys.js_key);
// jscs:enable

import * as attachFastClick from 'fastclick'
attachFastClick(document.body);

import 'fetch'
import {status} from './helpers/fetch'
window.rawfetch = window.fetch
window.fetch = (url, opts) => window.rawfetch(url, opts).then(status)

import * as React from 'react'
import * as Router from 'react-router'

import userStore from './stores/userStore'
import gameStore from './stores/gameStore'
import mapStore from './stores/mapStore'

import gameActions from './actions/gameActions'
import mapActions from './actions/mapActions'

import App       from './views/app'
import Auth      from './views/auth'
import Create    from './views/create'
import Game      from './views/game'
import Help      from './views/help'
import Home      from './views/home'
import Profile   from './views/profile'
import Rules     from './views/rules'
import Search    from './views/search'
import Tutorial  from './views/tutorial'

let routes = (
	React.createElement(Router.Route, {handler: App, name: 'App', path: '/'},
		React.createElement(Router.DefaultRoute, {handler: Home, name: 'home'}),
		React.createElement(Router.Route, {handler: Auth, name: 'sign-up'}),
		React.createElement(Router.Route, {handler: Auth, name: 'sign-in'}),
		React.createElement(Router.Route, {handler: Game, name: 'game', path: 'game/:gameId'}),
		React.createElement(Router.Route, {handler: Profile, name: 'profile'}),
		React.createElement(Router.Route, {handler: Search, name: 'search'}),
		React.createElement(Router.Route, {handler: Help, name: 'help'}),
		React.createElement(Router.Route, {handler: Rules, name: 'rules', path: 'help/rules'}),
		React.createElement(Router.Route, {handler: Tutorial, name: 'tutorial', path: 'help/tutorial'}),
		React.createElement(Router.Route, {handler: Create, name: 'create'})))

Router.run(routes, (Handler) => {
	React.render(React.createElement(Handler, null), document.getElementById('container'))
})
