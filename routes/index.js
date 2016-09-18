


exports.index = (req, res) => {
	
	res.sendFile('index.html', {'root':'views'});

}


exports.test = function(req, res) {
	var info = {
		'name': 'my application',
		'status': 'OK'
	}
	res.json(info);
}