var data = require('../groupData.json');

exports.view = function(req, res){
	var db = require("../db")
    var classname = req.query.classname;
    var userid = req.session.userid;
    if(userid === undefined) {
        res.render('index');
    }


    var hasGroups = false;
    db.getGroup(function (groups) {
        if(groups) {
            if(groups.length > 0) {
                hasGroups = true;
            }
            groups = replaceTimes(groups);
            groups = markIfBelongsTo(groups, userid);
            res.render('viewMap', {
                'title' : classname,
                'locData' : groups
            });
        }
    },classname);
};

function replaceTimes(groups) {
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var dateObjectStart = new Date(Date.parse(group.startTime));
        var startTime = putInTimeFormat(dateObjectStart);
        var dateObjectEnd = new Date(Date.parse(group.endTime));
        var endTime = putInTimeFormat(dateObjectEnd);
        group.startTime = startTime;
        group.endTime = endTime;
    }
    return groups;
}

function putInTimeFormat(dateObject) {
    var hour = parseInt(dateObject.getHours());
    var minutes = dateObject.getMinutes().toString();
    var time = "";
    var ampm = "am";
    if(hour >= 12) {
        ampm = "pm";
        if(hour !== 12) {
            hour = hour - 12;
        }
    }
    if(hour === 0) {
        hour = 12;
    }
    if(minutes < 10) {
        time = hour + ":" + minutes + "0" + ampm;
    } else {
        time = hour + ":" + minutes + ampm;
    }
    return time;
}

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