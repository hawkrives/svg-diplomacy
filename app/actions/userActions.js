import * as Reflux from 'reflux'

let userActions = Reflux.createActions([
	'didSignIn',
	'didSignUp',
	'didSignOut',
])

export default userActions
