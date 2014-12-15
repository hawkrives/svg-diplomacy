import * as React from 'react'

let Settings = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Settings')

		let elements = [
			React.createElement('div', {id: 'turn-length'},
				React.createElement('span', null, 'Turn Length'),
				React.createElement('output', {className: 'turn-box'})),

			React.createElement('div', {id: 'scnw'},
				React.createElement('span', null, 'Supply Centers Needed to Win'),
				React.createElement('output', {className: 'supply-box'})),

			React.createElement('label', {id: 'countries'}, 'Assign Countries Randomly?',
					React.createElement('input', {className: 'country-box', disabled: true, type: 'checkbox'})),

			React.createElement('label', {id: 'pre-build'}, 'Build Before Game Starts?',
				React.createElement('input', {className: 'build-box', disabled: true, type: 'checkbox'})),

			React.createElement('label', {id: 'fog-of-war'}, 'Enable Fog of War?',
				React.createElement('input', {className: 'fog-box', disabled: true, type: 'checkbox'})),
		]

		let form = React.createElement('div', {className: 'game-settings'}, elements)

		return form
	}
})

export default Settings
