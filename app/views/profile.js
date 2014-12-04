import * as React from 'react'
import userActions from '../actions/userActions'

let Profile = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'User\'s Profile')

		return React.createElement('div',
			{id: 'profile'},
			title,
			React.createElement('button', {onClick: userActions.willSignOut}, 'Sign Out'))
	}
})

export default Profile
