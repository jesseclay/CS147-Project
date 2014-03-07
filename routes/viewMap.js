var data = require('../groupData.json');

exports.view = function(req, res){
	var db = require("../db")
    var classname = req.query.classname;
    var userid = req.session.userid;
    // db.getGroup(function (groups) {
    //     if(groups) {
    //         res.render('viewMap', {
    //             'title' : classname,
    //             'locData' : groups
    //         });
    //     }
    // }, classname);

    var hasGroups = false;
    db.getGroup(function (groups) {
        if(groups) {
            if(groups.length > 0) {
                hasGroups = true;
            }
            groups = markIfBelongsTo(groups, userid);
            res.render('viewMap', {
                'title' : classname,
                'locData' : groups
            });
        }
    },classname);
};

function markIfBelongsTo(groups, userid) {
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var index = group.memberids.indexOf(userid);
        if(index != -1) {
            group.belongsToGroup = 1;
        } else {
            group.belongsToGroup = 0;
        }
    }
    return groups;
}