var data = require('../data.json');

exports.view = function(req, res){
	var db = require("../db")
	var userid = req.session.userid;
    db.getUserClasses(function (response) {
    	if(response) {
        	console.log(response);
                //create class
        }            
	}, userid);
	res.render('home', {'name': req.session.name, 'courses': data.courses});
};
