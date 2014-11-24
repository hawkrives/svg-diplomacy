import * as React from 'react'
import Toolbar from '../components/toolbar'

let Create = React.createClass({
	render() {
		return React.createElement('div', {id: 'creation'},
			"Creation Screen",
			React.createElement(Toolbar, {tools: ['Hello', 'Goodbye']}))
	}
})

export default Create
