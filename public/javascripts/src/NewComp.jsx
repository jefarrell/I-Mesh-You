import React from 'react';

const Ball = React.createClass({
	
	getInitialState: function() {
		return {diameter: 5}
	},

	handleClick: function(event) {
		let newDiam = this.state.diameter + 1;
		console.log(newDiam);
		this.setState({diameter: newDiam});
		// console.log("width: " + width);
	},

	render() {
		return (
			<div>
				<div><button onClick={this.handleClick}> Like Me</button></div>
				<svg width={this.props.width} height={this.props.height} className="circ">
					<circle cx={50} cy={50} r={this.state.diameter} fill={'red'} />
				</svg>
			</div>
		);
	}
});


export default Ball;
