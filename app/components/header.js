import * as React from 'react'
import * as Router from 'react-router'
let Link = Router.Link;

let Header = React.createClass({
	render() {
		return React.createElement("header", {id: 'header'},
			React.createElement(Link, {to: "App"}, React.createElement("h1", null, "SVG Diplomacy")),
			React.createElement("ul", null,
				React.createElement("li", null, React.createElement(Link, {to: "Profile"}, "Profile")),
				React.createElement("li", null, React.createElement(Link, {to: "Search"}, "Search")),
				React.createElement("li", null, React.createElement(Link, {to: "Help"}, "Help")),
				React.createElement("li", null, React.createElement(Link, {to: "Create"}, "Create"))
			)
		)
	}
})

export default Header
