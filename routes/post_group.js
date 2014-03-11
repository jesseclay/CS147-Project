var data = require('../groupData.json');

exports.view = function(req, res){
	var userid = req.session.userid;
	if(userid === undefined) {
    	res.render('index');
    }
	var db = require("../db");
	console.log(db);
	db.getLoc(displayLoc);
	function displayLoc(err, locations){
		if (err) {console.log(err); res.send(500);}
		console.log("passed");
		res.render('post_group',{
			"title": req.query.classname,
			"locData": locations
		});
	}
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
