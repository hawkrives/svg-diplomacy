import * as React from 'react'
import {Link as LinkClass} from 'react-router'
import {Octicon as OcticonClass} from './octicon'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

let Header = React.createClass({
	render() {
		return React.createElement('header', {id: 'header'},
			React.createElement('h1', null, "SVG Diplomacy"),
			React.createElement('ul', null,
				React.createElement('li', null, Link({to: "home"},    Octicon({icon: 'home'}))),
				React.createElement('li', null, Link({to: "profile"}, Octicon({icon: 'person'}))),
				React.createElement('li', null, Link({to: "search"},  Octicon({icon: 'search'}))),
				React.createElement('li', null, Link({to: "help"},    Octicon({icon: 'question'}))),
				React.createElement('li', null, Link({to: "create"},  Octicon({icon: 'plus'})))
			)
		)
	}
})

export default Header
