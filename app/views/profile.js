import * as React from 'react'
import {signOut} from '../helpers/auth'

let Profile = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'User\'s Profile')

		return React.createElement('div',
			{id: 'profile'},
			title,
			React.createElement('button', {onClick: signOut}, 'Sign Out'))
	}
})

export default Profile
