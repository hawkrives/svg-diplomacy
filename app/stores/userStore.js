import * as Reflux from 'reflux'

import userActions from '../actions/userActions'
import * as Authentication from '../helpers/auth'

let userStore = Reflux.createStore({
	listenables: userActions,

	onDidSignIn() {
		this.trigger()
	},

	onDidSignOut() {
		this.trigger()
	},

	onDidSignUp() {
		this.trigger()
	},
})

export default userStore
