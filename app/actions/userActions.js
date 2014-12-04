import * as Reflux from 'reflux'

let userActions = Reflux.createActions([
	'willSignIn',
	'willSignUp',
	'willSignOut',
])

export default userActions
