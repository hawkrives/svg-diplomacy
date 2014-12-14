// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import * as keys from './data/parse-api-key.json'
Parse.initialize(keys.app_id, keys.js_key);
// jscs:enable

import * as attachFastClick from 'fastclick'
attachFastClick(document.body);

import 'es6-shim'
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

import App        from './views/app'
import Auth       from './views/auth'
import Create     from './views/create'
import CreateGame from './views/createGame'
import CreateMap  from './views/createMap'
import Game       from './views/game'
import Help       from './views/help'
import Home       from './views/home'
import Profile    from './views/profile'
import Rules      from './views/rules'
import Search     from './views/search'
import Tutorial   from './views/tutorial'

let Route = React.createFactory(Router.Route);
let DefaultRoute = React.createFactory(Router.DefaultRoute);

let routes = (
	Route({handler: App, name: 'App', path: '/'},
		Route({handler: Auth, name: 'sign-up'}),
		Route({handler: Auth, name: 'sign-in'},
			Route({handler: Auth, name: 'reset-password'}),
			DefaultRoute({handler: Auth})),

		Route({handler: Game, name: 'game', path:'game/:gameId'}),

		Route({handler: Profile, name: 'profile'}),

		Route({handler: Search, name: 'search'}),

		Route({handler: Help, name: 'help'}),
		Route({handler: Rules, name: 'rules', path: 'help/rules'}),
		Route({handler: Tutorial, name: 'tutorial', path: 'help/tutorial'}),

		Route({handler: Create, name: 'create'}),
		Route({handler: CreateMap, name: 'create-map', path: 'create/map'}),
		Route({handler: CreateGame, name: 'create-game', path: 'create/game'}),

		DefaultRoute({handler: Home, name: 'home'})
	)
)

Router.run(routes, (Handler, state) => {
	React.render(React.createElement(Handler), document.getElementById('container'))
})
