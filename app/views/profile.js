import * as React from 'react'
import userActions from '../actions/userActions'

let Profile = React.createClass({
	componentWillReceiveProps(nextProps) {
		let email = nextProps.user ? nextProps.user.get('email') : null
		let username = nextProps.user ? nextProps.user.get('username') : null
		let name = nextProps.user ? nextProps.user.get('name') : null

		this.setState({email, username, name})
	},
	componentWillMount() {
		this.componentWillReceiveProps(this.props)
	},
	getInitialState: function() {
		return {
			email: '',
			name: '',
			username: '',
			saving: false,
		}
	},
	onNameChange(ev) {
		this.setState({name: ev.target.value})
	},
	onEmailChange(ev) {
		this.setState({email: ev.target.value})
	},
	onUsernameChange(ev) {
		this.setState({username: ev.target.value})
	},
	saveComplete() {
		this.setState({saving: 'saved'})
		console.log('saved user')
	},
	update(ev) {
		ev.preventDefault()
		this.setState({saving: 'saving'})
		this.props.user.set('username', this.state.username)
		this.props.user.set('name', this.state.name)
		this.props.user.set('password', this.refs.password.getDOMNode().value)
		this.props.user.save()
			.then(this.saveComplete)
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'User\'s Profile')

		let fields = [
			React.createElement('label', {key: 'name'}, 'Name: ', React.createElement('input',
				{type: 'text', placeholder: 'Anne Onymous', value: this.state.name, onChange: this.onNameChange})),

			React.createElement('label', {key: 'email'}, 'Email: ', React.createElement('input',
				{type: 'email', placeholder: 'anne@onymo.us', value: this.state.email, onChange: this.onEmailChange})),

			React.createElement('label', {key: 'username'}, 'Username: ', React.createElement('input',
				{type: 'username', placeholder: 'anne', value: this.state.username, onChange: this.onUsernameChange})),

			React.createElement('label', {key: 'password'}, 'Password: ', React.createElement('input',
				{type: 'password', placeholder: ':::::::', defaultValue: '', ref: 'password'})),
		]

		let profile = JSON.stringify(this.props.user, null, 2);

		return React.createElement('div',
			{id: 'profile'},
			title,
			profile,
			React.createElement('form', {className: 'edit-profile', onSubmit: this.update},
				fields,
				React.createElement('input', {type: 'submit', value: 'Save'}),
				React.createElement('button', {onClick: userActions.willSignOut}, 'Sign Out')))
	},
})

export default Profile
