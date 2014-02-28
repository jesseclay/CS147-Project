var data = require('../data.json');

exports.view = function(req, res){
	var db = require("../db")
	var userid = req.session.userid;
	var courses = "";
    var hasCourses = false;
    db.getUserClasses(function (response) {
    	if(response) {
        	console.log(response);
            courses = response;
            if(courses.length > 0) {
                hasCourses = true;
            }
        }
        res.render('home', {'name': req.session.name, 'courses': courses, 'hasCourses': hasCourses});            
	}, userid);
	
};

