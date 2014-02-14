var data = require('../data.json');

exports.view = function(req, res){
	 var db = require("../db")
   db.getGroup(function (group) {
        if(group) {
            console.log("returned: " + group);
        }
    });
	res.render('home', {'name': req.session.name, 'courses': data.courses});
};
