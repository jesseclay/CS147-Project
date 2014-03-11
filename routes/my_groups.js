var data = require('../groupData.json');

exports.view = function(req, res){
	var userid = req.session.userid;
	if(userid === undefined) {
    	res.render('index');
    }
	var db = require("../db")
    db.getMyGroups(function (groups) {
    	if(groups) {
    		console.log("group info: " + groups);
			res.render('my_groups', {
			'data' : groups
			});
        }
    }, userid);

    
  
};