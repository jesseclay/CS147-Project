exports.view = function(req, res){
	res.render('map', {
		'title' : req.query.name
	});
};