import * as React from 'react'
import {signOut} from '../helpers/auth'

let Profile = React.createClass({
	render() {
		return React.createElement('div', 
			{id: 'profile'}, 
			"User's Profile",
			React.createElement('button', {onClick: signOut}, 'Sign Out'))
	}
})

export default Profile
