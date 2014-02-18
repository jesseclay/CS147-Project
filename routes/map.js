var data = require('../groupData.json');

exports.view = function(req, res){
	var classname = req.query.name;
	var db = require("../db")
	console.log("classname: " + classname);
    db.getGroup(function (groups) {
    	if(groups) {
    		console.log("bissshh" + groups);
			res.render('map', {
			'title' : classname,
			'data' : groups
			});
        }
    }, classname);

    
  
};
