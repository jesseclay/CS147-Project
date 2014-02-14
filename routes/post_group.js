var data = require('../groupData.json');

exports.view = function(req, res){
	res.render('post_group',{
		"title": req.query.classname
	});
};

exports.add = function(req,res){
	var newgroup = 
		{
			"name": req.query.groupname,
			"location": req.query.location,
			"id": "newgroup",
			"startTime": "6:00 PM",
			"endTime": "8:00 PM"
		};
	data["groups"].unshift(newgroup);
	res.render('map', {
		'title' : req.query.classname,
		'data' : data
	});
};
