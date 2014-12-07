import * as Reflux from 'reflux'
import userActions from '../actions/userActions'

let userStore = Reflux.createStore({
	listenables: userActions,

	init() {
		// Note that, because the Parse.User.current thing is a function,
		// when we `trigger` with the user, we also call it. That way, we
		// don't accidentally cache a prior user.
		this.user = Parse.User.current;
	},

	getInitialState() {
		return Parse.User.current();
	},

	userDidSignIn(user) {
		// Hooray! Let them use the app now.
		console.log('login success!');
		this.trigger(this.user());
	},

	userErrorSignIn(error) {
		// Show the error message somewhere and let the user try again.
		console.error('Login Error: [' + error.code + '] ' + error.message);
		this.trigger(null, error);
	},

	onWillSignIn(userData) {
		Parse.User.logIn(userData.username, userData.password)
			.then(this.userDidSignIn, this.userErrorSignIn)
	},

	onWillSignUp(userData) {
		let user = new Parse.User();
		user.setUsername(userData.username);
		user.setEmail(userData.email);
		user.setPassword(userData.password);

		user.signUp(null)
			.then(this.userDidSignIn, this.userErrorSignIn);
	},

	onWillSignOut() {
		Parse.User.logOut();
		this.trigger(this.user());
	},
})

export default userStore
