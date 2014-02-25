var data = require('../groupData.json');

exports.view = function(req, res){
	var db = require("../db")
    var classname = req.query.classname;
    db.getGroup(function (groups) {
        if(groups) {
            res.render('viewMap', {
                'title' : classname,
                'locData' : groups
            });
        }
    }, classname);
};