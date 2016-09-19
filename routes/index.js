

exports.index = (req, res) => {
	
	res.sendFile('index.html', {'root':'views'});

}

exports.test = (req, res) => {
	var info = {
		'name': 'my application',
		'status': 'OK'
	}
	res.json(info);
}

exports.addData = (req, res) => {
	console.log(req.body);
	res.send("back atcha")
}