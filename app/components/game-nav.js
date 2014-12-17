import * as React from 'react'
import {State} from 'react-router'
import {Octicon as OcticonClass} from './octicon'
import {Link as LinkClass} from 'react-router'

let Octicon = React.createFactory(OcticonClass)
let Link = React.createFactory(LinkClass)

let GameNavbar = React.createClass({
	mixins: [State],
	render() {
		let boardLink   = React.createElement('li', {key: 'board'},   Link({to: 'game', params: this.getParams(), query: {section: 'board'}},   Octicon({icon: 'globe'})))
		let chatLink    = React.createElement('li', {key: 'chat'},    Link({to: 'game', params: this.getParams(), query: {section: 'chat'}},    Octicon({icon: 'comment-discussion'})))
		let historyLink = React.createElement('li', {key: 'history'}, Link({to: 'game', params: this.getParams(), query: {section: 'history'}}, Octicon({icon: 'clock'})))
		let infoLink    = React.createElement('li', {key: 'info'},    Link({to: 'game', params: this.getParams(), query: {section: 'info'}},    Octicon({icon: 'gear'})))

		let navItems = []

		if (this.props.status === 'preGame') {
			navItems = [boardLink, infoLink]
		}
		else if (this.props.status === 'active') {
			navItems = [boardLink, chatLink, historyLink, infoLink]
		}
		else if (this.props.status === 'completed') {
			navItems = [historyLink, infoLink]
		}

		return React.createElement('ul', {id: 'game-nav', className: 'menu'}, navItems)
	},
})

export default GameNavbar
