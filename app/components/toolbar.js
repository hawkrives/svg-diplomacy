import * as React from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router'

let Toolbar = React.createClass({
	render() {
		return React.createElement('ul', {className: 'toolbar'}, _.map(this.props.tools, (tool) =>
			React.createElement('li', {className: 'toolbar-item', key: tool},
				React.createElement(Link, {to: tool, className: 'tool'}, tool
			))))
	}
})

export default Toolbar
