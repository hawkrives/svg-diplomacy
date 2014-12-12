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

		let email = this.refs.email && this.refs.email.getDOMNode().value;
		let username = this.refs.user && this.refs.user.getDOMNode().value;
		let password = this.refs.password && this.refs.password.getDOMNode().value;

		if (this.getPathname() === '/sign-in')
			userActions.willSignIn({username: username, password: password})
		else if (this.getPathname() === '/sign-up')
			userActions.willSignUp({username: username, password: password, email: email})
		else if (this.getPathname() === '/sign-in/reset-password')
			userActions.willResetPassword({email: email})
	},

	render() {
		if (this.state.user) {
			this.replaceWith('/');
		}

		let englishVerb, selector;
		if (this.getPathname() === '/sign-in') {
			englishVerb = 'Sign In'
			selector = 'sign-in'
		}
		else if (this.getPathname() === '/sign-up') {
			englishVerb = 'Sign Up'
			selector = 'sign-up'
		}
		else if (this.getPathname() === '/sign-in/reset-password') {
			englishVerb = 'Reset Password'
			selector = 'reset-password'
		}

		let usernameField = React.createElement('input', {
			type: 'text',
			id: 'username',
			placeholder: 'Username',
			autoCorrect: 'none',
			autoCapitalize: 'none',
			ref: 'user',
			key: 'username',
		})
		let passwordField = React.createElement('input', {
			type: 'password',
			id: 'password',
			placeholder: 'Password',
			ref: 'password',
			key: 'password',
		})
		let emailField = React.createElement('input', {
			type: 'email',
			id: 'email',
			placeholder: 'Email, please',
			ref: 'email',
			key: 'email',
		})

		let passwordResetLink = React.createElement(Link, {to: '/sign-in/reset-password', key: 'pw-reset', className: 'reset-password'}, 'Reset Password')

		let submitButton = React.createElement('input', {
			type: 'submit',
			key: selector,
			id: selector,
			value: englishVerb,
		})

		let formElements = [];
		if (this.getPathname() === '/sign-in') {
			formElements = [usernameField, passwordField, passwordResetLink, submitButton]
		}
		else if (this.getPathname() === '/sign-up') {
			formElements = [usernameField, passwordField, emailField, submitButton]
		}
		else if (this.getPathname() === '/sign-in/reset-password') {
			formElements = [emailField, submitButton]
		}

		let form = React.createElement('form', {onSubmit: this.submitForm}, formElements)

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
			form)
	},
})

export default AuthView
