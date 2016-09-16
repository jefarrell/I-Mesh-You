import React from 'react';
import {render} from 'react-dom';
import Ball from './newComp.jsx';


const App = React.createClass({
	render() {
		return (
			<div>
				<p>YEAH FUCK YOU!  </p>
				<Ball width={700} height={100} />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));