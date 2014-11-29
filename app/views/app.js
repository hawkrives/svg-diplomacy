import * as React from 'react'
import {RouteHandler} from 'react-router'

import Header from '../components/header'

let App = React.createClass({
	render() {
		return React.createElement('div', {className: 'app'},
			React.createElement(Header, null),
			React.createElement('main', null, 
				React.createElement(RouteHandler, null)));
	}
});

export default App
