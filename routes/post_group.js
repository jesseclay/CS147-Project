var data = require('../groupData.json');

exports.view = function(req, res){
	res.render('post_group');
};

exports.add = function(req,res){
	var newgroup = 
		{
			"assignment": req.query.name,
			"location": req.query.location,
			"id": "newgroup",
			"startTime": "6:00 PM",
			"endTime": "8:00 PM"
		}
	data["groups"].unshift(newgroup);
	res.redirect('home');
};
