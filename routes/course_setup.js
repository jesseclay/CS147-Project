var data = require('../data.json');

exports.view = function(req, res){
	res.render('course_setup', data);
};

exports.add = function(req,res){
	if (req.query.name) {
		var newclass = 
		{
			"name": req.query.name,
			"description": "No Description",
			"units" : "Unknown"
		}
	}
	data["courses"].unshift(newclass);
	res.render('course_setup', data);
};