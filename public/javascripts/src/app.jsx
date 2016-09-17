import React from 'react';
import {render} from 'react-dom';
import Ball from './newComp.jsx';


const App = React.createClass({
	render() {
		return (
			<div>
				<p> React App </p>
				<Ball  />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));