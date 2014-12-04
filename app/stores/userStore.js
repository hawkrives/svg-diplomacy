import * as Reflux from 'reflux'

import userActions from '../actions/userActions'
import * as Authentication from '../helpers/auth'

let userStore = Reflux.createStore({
	listenables: userActions,

	init() {
		this.user = Parse.User.current();
	},

	onWillSignIn(userData) {
		let self = this;
		Parse.User.logIn(userData.username, userData.password, {
			success(user) {
				// Hooray! Let them use the app now.
				console.log('login success!');
				self.onDidSignIn();
			},
			error(user, error) {
				// Show the error message somewhere and let the user try again.
				console.error("Login Error: [" + error.code + "] " + error.message);
			}
		});
	},

	onWillSignUp(userData) {
		let self = this;
		console.log(userData)
		let user = new Parse.User();
		user.setUsername(userData.username);
		user.setEmail(userData.email);
		user.setPassword(userData.password);

		user.signUp(null, {
			success(user) {
				// Hooray! Let them use the app now.
				console.log('signup success!');
				self.onDidSignUp(user);
			},
			error(user, error) {
				// Show the error message somewhere and let the user try again.
				console.error("Signup Error: " + error.code + " " + error.message);
			}
		});
	},

	onWillSignOut() {
		Parse.User.logOut();
		this.onDidSignOut();
	},

	onDidSignIn() {
		this.trigger(this.user)
	},

	onDidSignOut() {
		this.trigger(this.user)
	},

	onDidSignUp() {
		this.trigger(this.user)
	},
})

export default userStore
