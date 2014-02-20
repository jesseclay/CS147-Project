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
        res.render('home', {'name': req.session.name, 'courses': courses});            
	}, userid);
	
};

