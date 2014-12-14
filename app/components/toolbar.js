import * as React from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router'

let Toolbar = React.createClass({
	render() {
		return React.createElement('ul', {className: 'toolbar'},
			_.map(this.props.tools, (tool) =>
				React.createElement('li', {key: tool.title},
					React.createElement(Link, {className: 'toolbar-item', to: tool.to}, tool.title))))
	}
})

export default Toolbar
