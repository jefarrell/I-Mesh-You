import React from 'react';

const Ball = React.createClass({
	
	getInitialState: function() {
		return {diameter: 5}
	},

	handleClick: function(event) {
		let newDiam = this.state.diameter + 1;
		this.setState({diameter: newDiam});
	},

	render() {
		return (
			<div> React Component</div>
		);
	}
});


export default Ball;
