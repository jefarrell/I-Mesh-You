import React from 'react';
import {render} from 'react-dom';
import Map from './Map.jsx';
import Search from './Search.jsx';

const App = React.createClass({
	render() {
		return (
			<div>
				<Search />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));

/*

App
	Map
		Popup
		Legend

App calls Map
	Map calls Popup
		Popup runs callback to Map to trigger update on submission (wonky but w/e)
	Map calls Legend, color props
	
*/