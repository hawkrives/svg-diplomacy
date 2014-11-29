import * as React from 'react'
import {Link} from 'react-router'

let Help = React.createClass({
	render() {
		let rules = React.createElement('article', {className: 'short-rules'},
			React.createElement(Link, {to: 'rules'}, React.createElement('h2', {className: 'subtitle'}, 'Rules')),
			React.createElement('p', null, "Rules! Rules rules rules rules, rule rules rules rules."))

		let tutorial = React.createElement('article', {className: 'short-tutorial'},
			React.createElement(Link, {to: 'tutorial'}, React.createElement('h2', {className: 'subtitle'}, 'Tutorial')),
			React.createElement('p', null, "Tutorial! Tutorial tutorial tutorial tutorial, rule tutorial tutorial tutorial."))

		let title = React.createElement('h1', {className: 'view-title'}, 'Help')

		return React.createElement('div',
			{id: 'help'},
			title,
			rules,
			tutorial)
	}
})

export default Help
