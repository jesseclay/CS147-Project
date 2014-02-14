var data = require('../groupData.json');

exports.view = function(req, res){
	var classname = req.query.name;
	var db = require("../db")

    db.getGroup(function (groups) {
    	if(groups) {
    		console.log("check" + groups);
			res.render('map', {
			'title' : classname,
			'data' : groups
			});
        }
    }, classname);

    
  
};
