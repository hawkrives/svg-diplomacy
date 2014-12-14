import * as React from 'react'
import {Octicon as OcticonClass} from './octicon'

let Octicon = React.createFactory(OcticonClass);

let GameNavbar = React.createClass({
	render() {
		return React.createElement('ul', {id: 'game-nav', className: 'menu'},
			React.createElement('li', {key: 'board'},	Octicon({icon: 'globe'})),
			React.createElement('li', {key: 'chat'},	Octicon({icon: 'comment-discussion'})),
			React.createElement('li', {key: 'history'},	Octicon({icon: 'clock'})),
			React.createElement('li', {key: 'info'},	Octicon({icon: 'gear'}))
		)
	},
})

export default GameNavbar
