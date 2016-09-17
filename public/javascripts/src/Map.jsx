import React from 'react';
var ReactDOM = require('react-dom');
var L = require('leaflet');
//require('leaflet/dist/leaflet.css');

var config = {};


config.params = {
	center: [40.655769,-73.938503],
	zoomControl: false,
	zoom: 13,
	maxZoom: 19,
	minZoom: 11,
	scrollwheel: false,
	scrollWheelZoom: false,
	legends: true,
	infoControl: false,
	attributionControl: true
}

config.tileLayer = {
  uri: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  params: {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    id: '',
    accessToken: ''
  }
};


const Map = React.createClass({
	
	getInitialState: function() {
		return {
			tileLayer: null
		};
	},

	map: null,

	componentDidMount: function() {
		if(!this.map) this.init(this.getID());
	},

	componentDidUpdate: function() {

	},

	updateMap: function() {

	},

	pointToLayer: function() {

	},

	onEachFeature: function() {

	},

	getID: function() {
		return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
	},

	init: function(id) {
		if (this.map) return;
		
		this.map = L.map(id, config.params);
	    L.control.zoom({ position: "bottomleft"}).addTo(this.map);
	    L.control.scale({ position: "bottomleft"}).addTo(this.map);

	    var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);
		this.setState({ tilelayer: tileLayer });
	},

	render: function() {
		return (
			<div id="mapUI">
				<div id="map"></div>
			</div>
		);
	}

});


export default Map;