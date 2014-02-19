var data = require('../groupData.json');

exports.view = function(req, res){
	var db = require("../db")
    // db.insertUser("Queef");
    db.getGroup(function (group) {
        if(group) {
            console.log("returned: " + group);
        }
    });

    

	res.render('viewMap', {
		'title' : req.query.classname,
		'data' : data
	});
};