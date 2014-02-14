var data = require('../data.json');

exports.view = function(req, res){
	console.log("check " +  req.session.name);
	res.render('home', {'name': req.session.name, 'courses': data.courses});
};