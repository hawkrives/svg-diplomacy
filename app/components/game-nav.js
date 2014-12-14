import * as React from 'react'
import {State} from 'react-router'
import {Octicon as OcticonClass} from './octicon'
import {Link as LinkClass} from 'react-router'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

let GameNavbar = React.createClass({
	mixins: [State],
	render() {
		return React.createElement('ul', {id: 'game-nav', className: 'menu'},
			React.createElement('li', null,
				Link({to: 'game', params: this.getParams(), query: {section: 'board'}}, Octicon({icon: 'globe'}
			))),
			React.createElement('li', null,
				Link({to: 'game', params: this.getParams(), query: {section: 'chat'}}, Octicon({icon: 'comment-discussion'}
			))),
			React.createElement('li', null,
				Link({to: 'game', params: this.getParams(), query: {section: 'history'}}, Octicon({icon: 'clock'}
			))),
			React.createElement('li', null,
				Link({to: 'game', params: this.getParams(), query: {section: 'info'}}, Octicon({icon: 'gear'}
			)))
		)
	},
})

export default GameNavbar
