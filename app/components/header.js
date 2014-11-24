import * as React from 'react'
import * as Router from 'react-router'
let Link = Router.Link;

let Header = React.createClass({
	render() {
		return React.createElement("header", {id: 'header'},
			React.createElement(Link, {to: "home"}, React.createElement("h1", null, "SVG Diplomacy")),
			React.createElement("ul", null,
				React.createElement("li", null, React.createElement(Link, {to: "profile"}, "Profile")),
				React.createElement("li", null, React.createElement(Link, {to: "search"}, "Search")),
				React.createElement("li", null, React.createElement(Link, {to: "help"}, "Help")),
				React.createElement("li", null, React.createElement(Link, {to: "create"}, "Create"))
			)
		)
	}
})

export default Header
