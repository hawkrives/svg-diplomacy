import * as React from 'react'
import * as _ from 'lodash'
import Toolbar from '../components/toolbar'

let Create = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		let toolbar = React.createElement(Toolbar,
			{
				tools: [
					{title: 'Start Game', to: 'create-game'},
					{title: 'Make Map', to: 'create-map'},
				]
			})

		return React.createElement('div',
			{id: 'create'},
			title,
			toolbar)
	},
})

export default Create
