import * as keys from './data/parse-api-key.json'
// Parse.initialize(keys.app_id, keys.js_key);

import * as attachFastClick from 'fastclick'
attachFastClick(document.body);

import * as React from 'react'

import * as Router from 'react-router'
import {Route, DefaultRoute} from 'react-router'

import App       from './views/app'
import Home      from './views/home'
import Game      from './views/game'
import GamesList from './views/games-list'
import Profile   from './views/profile'
import Search    from './views/search'
import Help      from './views/help'
import Create    from './views/create'

let routes = (
	React.createElement(Route, {handler: App, name: 'App', path: "/"},
		React.createElement(DefaultRoute, {handler: Home, name: 'home'}),
		React.createElement(Route, {handler: GamesList, name: 'games'}),
		React.createElement(Route, {handler: Game, name: 'game', path: 'game/:gameId'}),
		React.createElement(Route, {handler: Profile, name: 'profile'}),
		React.createElement(Route, {handler: Search, name: 'search'}),
		React.createElement(Route, {handler: Help, name: 'help'}),
		React.createElement(Route, {handler: Create, name: 'create'})))

// var Game = Parse.Object.extend("Game");
// var currentGame = new Game();
// currentGame.save({users: ["bar", 'rives']}).then(function(object) {
// 	console.log("yay! it worked");
// });

Router.run(routes, (Handler) => {
	React.render(React.createElement(Handler, null), document.getElementById('container'))
})
