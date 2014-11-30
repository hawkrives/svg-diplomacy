import userActions from '../actions/userActions'

let signUp = (userData) => {
	return new Promise((resolve, reject) => {
		console.log(userData)
		let user = new Parse.User();
		user.setUsername(userData.username);
		user.setEmail(userData.email);
		user.setPassword(userData.password);

		user.signUp(null, {
			success(user) {
				// Hooray! Let them use the app now.
				console.log('signup success!');

				userActions.didSignUp(user);
				resolve(user);
			},
			error(user, error) {
				// Show the error message somewhere and let the user try again.
				console.error("Signup Error: " + error.code + " " + error.message);
				reject(error);
			}
		});
	})
}

let signIn = (userData) => {
	return new Promise((resolve, reject) => {
		Parse.User.logIn(userData.username, userData.password, {
			success(user) {
				// Hooray! Let them use the app now.
				console.log('login success!');
				userActions.didSignIn(user);
				resolve(user);
			},
			error(user, error) {
				// Show the error message somewhere and let the user try again.
				console.error("Login Error: [" + error.code + "] " + error.message);
				reject(error);
			}
		});
	})
}

let signOut = () => {
	return new Promise((resolve, reject) => {
		Parse.User.logOut();
		userActions.didSignOut();
		resolve(null);
	})
}

// Parse.User.current() either returns an object or null
let isSignedIn = () => Boolean(Parse.User.current());

let currentUser = () => Parse.User.current();

let AuthenticationMixin = {
	statics: {
		willTransitionTo(transition) {
			if (!isSignedIn()) {
				Login.attemptedTransition = transition;
				transition.redirect('/sign-in');
			}
		}
	}
};

export {signUp, signIn, signOut, isSignedIn, currentUser, AuthenticationMixin}
