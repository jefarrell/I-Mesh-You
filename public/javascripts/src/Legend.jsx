import React from 'react'

const Legend = React.createClass({

	render: function() {
		var primStyle = {
		  backgroundColor: '#'+this.props.primCol,
		  WebkitTransition: 'all', 
		  msTransition: 'all' 
		};

		var potStyle = {
			backgroundColor: '#'+this.props.potCol,
			WebkitTransition: 'all', 
		  	msTransition: 'all' 
		}

		return(
			<div id="legend">
				<div className={"row legRow"}>
					<div id="prim" style={primStyle}></div>
					<div className={"legText"}> Primary Mesh </div>
				</div>
				<div className={"row legRow"}>
					<div id="pot" style={potStyle}></div>
					<div className={"legText"}> Potential Mesh </div>
				</div>
				
			</div>
		)
	}
});


export default Legend

/*
			<div id="legend">
				<div className={"row cards"} id="primCard" style={primStyle}>
					<div>
						<p className={"cardText"}>Primary Mesh</p>
					</div>
				</div>

				<div className={"row cards"} id="potCard" style={potStyle}> 
					<div>
						<p className={"cardText"}>Potential Mesh</p>
					</div>
				</div>
			</div>
			*/