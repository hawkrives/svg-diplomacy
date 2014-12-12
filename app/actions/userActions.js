import * as Reflux from 'reflux'

let userActions = Reflux.createActions([
	'willSignIn',
	'willSignUp',
	'willResetPassword',
	'willSignOut',
])

export default userActions
