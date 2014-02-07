var data = require('../data.json');

exports.view = function(req, res){
	res.render('course_setup', data);
};