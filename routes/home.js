var data = require('../data.json');

exports.view = function(req, res){
	res.render('home', {'name': req.session.name, 'courses': data.courses});
};