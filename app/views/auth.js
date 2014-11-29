import * as React from 'react'
import {State, Link} from 'react-router'

let AuthView = React.createClass({
	mixins: [State],

	render() {
		let signIn = this.getPathname() === '/sign-in'
		let englishVerb = signIn ? 'Sign In' : 'Sign Up'
		let selector = signIn ? 'sign-in' : 'sign-up'

		let usernameField = React.createElement('input', {type: 'text', id: 'username', placeholder: 'Username', autoCorrect: "none", autoCapitalize:"none"})
		let passwordField = React.createElement('input', {type: 'password', id: 'password', placeholder: 'Password'})
		let emailField = React.createElement('input', {type: 'email', id: 'email', placeholder: 'Email, please'})
		let submitButton = React.createElement('input', {type: 'submit', id: selector, value: englishVerb})

		let form = React.createElement('form', null, 
			usernameField, 
			passwordField, 
			signIn ? null : emailField,
			submitButton)

		let signInWords = React.createElement(Link, {to: 'sign-in'}, 'Sign In')
		let signUpWords = React.createElement(Link, {to: 'sign-up'}, 'Sign Up')
		let title = React.createElement('h1', {className: 'view-title'}, signInWords, ' | ', signUpWords)

		return React.createElement('div',
			{id: 'authentication'},
			title,
			form)
	}
})

export default AuthView
