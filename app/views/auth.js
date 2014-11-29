import * as React from 'react'
import {State, Link, Navigation} from 'react-router'
import {signIn, signUp, isSignedIn} from '../helpers/auth'

let AuthView = React.createClass({
	mixins: [State, Navigation],

	statics: {
		attemptedTransition: null
	},

	getInitialState() {
		return {
			error: false,
			errorDetails: null,
		}
	},

	submitForm(event) {
		event.preventDefault();

		let willSignIn = this.getPathname() === '/sign-in'
		let action = willSignIn ? signIn : signUp

		let email = this.refs.email && this.refs.email.getDOMNode().value;
		let username = this.refs.user.getDOMNode().value;
		let password = this.refs.password.getDOMNode().value;

		action({username: username, password: password, email: email})
			.then((user) => {
				if (Login.attemptedTransition) {
					let transition = Login.attemptedTransition;
					Login.attemptedTransition = null;
					transition.retry();
				} else {
					this.replaceWith('/');
				}
			}).catch((error) => {
				return this.setState({ error: true, errorDetails: error });
			})
	},

	render() {
		if (isSignedIn() && !Login.attemptedTransition) {
			this.replaceWith('/profile')
		}

		let willSignIn = this.getPathname() === '/sign-in'
		let englishVerb = willSignIn ? 'Sign In' : 'Sign Up'
		let selector = willSignIn ? 'sign-in' : 'sign-up'

		console.log(this.refs)

		let usernameField = React.createElement('input', {
			type: 'text', 
			id: 'username', 
			placeholder: 'Username', 
			value: this.state.username, 
			autoCorrect: 'none', 
			autoCapitalize: 'none', 
			ref: 'user',
		})
		let passwordField = React.createElement('input', {
			type: 'password', 
			id: 'password', 
			placeholder: 'Password', 
			value: this.state.password, 
			ref: "password",
		})
		let emailField = React.createElement('input', {
			type: 'email', 
			id: 'email', 
			placeholder: 'Email, please', 
			value: this.state.email, 
			ref: 'email',
		})
		let submitButton = React.createElement('input', {
			type: 'submit', 
			id: selector, 
			value: englishVerb
		})


		let form = React.createElement('form', {onSubmit: this.submitForm}, 
			usernameField, 
			passwordField, 
			willSignIn ? null : emailField,
			submitButton)

		let signInWords = React.createElement(Link, {to: 'sign-in'}, 'Sign In')
		let signUpWords = React.createElement(Link, {to: 'sign-up'}, 'Sign Up')
		let title = React.createElement('h1', {className: 'view-title'}, signInWords, ' | ', signUpWords)

		return React.createElement('div',
			{id: 'authentication'},
			title,
			form,
			JSON.stringify(this.state.errorDetails))
	}
})

export default AuthView
