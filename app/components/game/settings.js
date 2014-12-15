import * as React from 'react'
import Subtitle from './subtitle'

let Settings = React.createClass({
	render() {
		let settingsList = [
			React.createElement('li', {key: 'Turn Length'}),
			React.createElement('li', {key: 'Supply Centers Needed to Win'}),
			React.createElement('li', {key: 'Countries'}),
			React.createElement('li', {key: 'Build on First Turn'}),
			React.createElement('li', {key: 'Fog of War'}),
			]

		return React.createElement('settings', {id: 'settings'},
			React.createElement(Subtitle, {text: 'Game Settings'}),
			React.createElement('ul', {className: 'settingsMenu'}, settingsList)
		)
	},
})

export default Settings
