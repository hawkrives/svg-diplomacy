import * as React from 'react'
import * as Router from 'react-router'
let RouteHandler = Router.RouteHandler;

import Header from '../components/header'

let App = React.createClass({
	render() {
		return React.createElement("div", {className: 'app'},
			React.createElement(Header, null),
			React.createElement('main', null,
				React.createElement(RouteHandler, null))
		);
	}
});

export default App
