import * as React from 'react'
import * as _ from 'lodash'

let Toolbar = React.createClass({
	render() {
		return React.createElement('ul', {className: 'toolbar'},
			_.map(this.props.tools, tool => React.createElement('li', {className: 'toolbar-item'}, tool)))
	}
})

export default Toolbar
