import * as Reflux from 'reflux'

let userActions = Reflux.createActions([
	'didSignIn',
	'didSignUp',
	'didSignOut',
	'willSignIn',
	'willSignUp',
	'willSignOut',
])

export default userActions
