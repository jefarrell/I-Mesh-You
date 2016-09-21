import React from 'react';
import Popup from './Popup.jsx'
import Legend from './Legend.jsx'

const ReactDOM = require('react-dom');
const L = require('leaflet');

var config = {};


config.params = {
	center: [40.7087462,-73.9707151],
	zoomControl: false,
	zoom: 12,
	maxZoom: 19,
	minZoom: 3,
	scrollwheel: false,
	scrollWheelZoom: false,
	legends: true,
	infoControl: false,
	attributionControl: true
}

config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  params: {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};


const Map = React.createClass({
	
	getInitialState: function() {
		return {
			tileLayer: null,
			geojsonLayer: null,
			geojson: null
		};
	},

	map: null,

	componentDidMount: function() {

		this.getData();

		if(!this.map) this.init(this.getID());
	},

	componentDidUpdate: function() {

	},

	componentWillUnmount: function() {
		this.map.remove();
	},

	updateMap: function() {

	},



	getData: function() {
		var self = this;
		$.get('/mapData', function(data) {
			self.addGeoJSONLayer(data);
			console.log(data);
		});
	},


	addGeoJSONLayer: function(geojson) {
		this.setState({geojson: geojson});
		var geojsonLayer = L.geoJson(geojson, {
			// onEachFeature: this.onEachFeature,
			pointToLayer: this.pointToLayer
		});

		geojsonLayer.addTo(this.map);
		this.setState({geojsonLayer: geojsonLayer});
	},



	pointToLayer: function(feature, latlng) {

		var primaryParams = {
			//radius: 60,
			fillColor: '#F44336',
			color: '#B71C1C',
			weight: 1,
			opacity: 0.8,
			fillOpacity: 0.6
		};

		var potentialParams = {
			//radius: 60,
			fillColor: '#4CAF50',
			color: '#2E7D32',
			weight: 1,
			opacity: 0.8,
			fillOpacity: 0.6
		}

		const halfMileMeter = 804;

		if (feature.properties.name === 'Primary Location') {
			return L.circle(latlng, halfMileMeter, primaryParams);
		} else {
			return L.circle(latlng, halfMileMeter, potentialParams);
		}
	},

	onEachFeature: function(feature, layer) {
		var popup = '<div><p>'+feature.properties.name+'</p></div>';
		layer.bindPopup(popup);
	},

	getID: function() {
		return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
	},

	init: function(id) {
		if (this.map) return;
		
		this.map = L.map(id, config.params);
	    L.control.zoom({ position: "bottomleft"}).addTo(this.map);
	    L.control.scale({ position: "bottomright"}).addTo(this.map);

	    var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);
		this.setState({ tilelayer: tileLayer });
	},

	render: function() {
		return (
			<div id="mapUI">
				<Popup />
				<Legend potCol="4CAF50" primCol="F44336"/>
				<div id="map"></div>
			</div>
		);
	}

});


export default Map;