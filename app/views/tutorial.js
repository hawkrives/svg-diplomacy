import * as React from 'react'
import * as marked from 'marked'

let Tutorial = React.createClass({
	getInitialState() {
		return {
			tutorialHTML: '<p>Loading Tutorial&hellip;</p>',
		}
	},
	componentWillMount() {
		let pathToTutorial = 'detailed-tutorial.text';

		fetch(pathToTutorial)
			.then((response) => {
				this.setState({tutorialHTML: marked(response._body)})
			})
	},
	render() {
		let tutorial = React.createElement('article', {className: 'detailed-tutorial'},
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.tutorialHTML}}))

		let title = React.createElement('h1', {className: 'view-title'}, 'Tutorial')

		return React.createElement('div',
			{id: 'tutorial'},
			title,
			tutorial)
	}
})

export default Tutorial


