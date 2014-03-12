var data = require('../groupData.json');

exports.view = function(req, res){
	var userid = req.session.userid;
	if(userid === undefined) {
    	res.render('index');
    }
	var db = require("../db");
    
    var hasGroups = false;
    db.getMyGroups(function (groups) {
    	if(groups) {
    		console.log("group info: " + groups);
            if(groups.length > 0) {
                hasGroups = true;
            }
            groups = replaceTimes(groups);
			res.render('my_groups', {
                'data' : groups,
                'hasGroups' : hasGroups
			});
        }
    }, userid);
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