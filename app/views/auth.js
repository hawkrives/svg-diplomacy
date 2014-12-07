import * as React from 'react'
import * as Reflux from 'reflux'
import {State, Link, Navigation} from 'react-router'
import userActions from '../actions/userActions'
import userStore from '../stores/userStore'

let AuthView = React.createClass({
	mixins: [State, Navigation, Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged')],

	onUserChanged(user, error) {
		this.setState({user, error})
	},

	getInitialState() {
		return {
			user: null,
			error: null,
		}
	},

	submitForm(event) {
		event.preventDefault();

		let willSignIn = this.getPathname() === '/sign-in'
		let action = willSignIn ? userActions.willSignIn : userActions.willSignUp

		let email = this.refs.email && this.refs.email.getDOMNode().value;
		let username = this.refs.user.getDOMNode().value;
		let password = this.refs.password.getDOMNode().value;

		action({username: username, password: password, email: email})
	},

	render() {
		if (this.state.user) {
			this.replaceWith('/');
		}

		let willSignIn = this.getPathname() === '/sign-in'
		let englishVerb = willSignIn ? 'Sign In' : 'Sign Up'
		let selector = willSignIn ? 'sign-in' : 'sign-up'

		let usernameField = React.createElement('input', {
			type: 'text',
			id: 'username',
			placeholder: 'Username',
			autoCorrect: 'none',
			autoCapitalize: 'none',
			ref: 'user',
		})
		let passwordField = React.createElement('input', {
			type: 'password',
			id: 'password',
			placeholder: 'Password',
			ref: 'password',
		})
		let emailField = React.createElement('input', {
			type: 'email',
			id: 'email',
			placeholder: 'Email, please',
			ref: 'email',
		})
		let submitButton = React.createElement('input', {
			type: 'submit',
			id: selector,
			value: englishVerb,
		})


		let form = React.createElement('form', {onSubmit: this.submitForm},
			usernameField,
			passwordField,
			willSignIn ? null : emailField,
			submitButton)

		let error;
		if (this.state.error) {
			error = React.createElement('div',
				{className: 'message error-message'},
				'Error ', this.state.error.code, ': ',
				this.state.error.message)
		}

		return React.createElement('div',
			{id: 'authentication'},
			error,
			form
		)
	},
})

export default AuthView
