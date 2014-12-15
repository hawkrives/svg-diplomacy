import * as React from 'react'

import {Octicon as OcticonClass} from './octicon'
import {Link as LinkClass} from 'react-router'

let Octicon = React.createFactory(OcticonClass)
let Link = React.createFactory(LinkClass)

let GameNavbar = React.createClass({
	render() {
		let preGameItems = [
			React.createElement('li', {key: 'board'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'board'}},	Octicon({icon: 'globe'}))),
			React.createElement('li', {key: 'info'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'info'}},	Octicon({icon: 'gear'}))),
		]

		let activeGameItems = [
			React.createElement('li', {key: 'board'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'board'}},	Octicon({icon: 'globe'}))),
			React.createElement('li', {key: 'chat'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'chat'}},	Octicon({icon: 'comment-discussion'}))),
			React.createElement('li', {key: 'history'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'history'}},	Octicon({icon: 'clock'}))),
			React.createElement('li', {key: 'info'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'info'}},	Octicon({icon: 'gear'}))),
		]

		let completedGameItems = [
			React.createElement('li', {key: 'history'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'history'}},	Octicon({icon: 'clock'}))),
			React.createElement('li', {key: 'info'},	Link({to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'info'}},	Octicon({icon: 'gear'}))),
		]

		let navItems = activeGameItems

		return React.createElement('ul', {id: 'game-nav', className: 'menu'}, navItems)
	},
})

export default GameNavbar
