var data = require('../groupData.json');

exports.view = function(req, res){
	res.render('map', {
		'title' : req.query.name,
		'data' : data
	});
};