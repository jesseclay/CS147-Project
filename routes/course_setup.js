var data = require('../data.json');


exports.view = function(req, res){
	var db = require("../db")
	var userid = req.session.userid;
	var courses = "";
    db.getUserClasses(function (response) {
    	if(response) {
        	console.log(response);
            courses = response;
        }
        res.render('course_setup', {'courses': courses});            
	}, userid);
	// res.render('course_setup', data);
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
