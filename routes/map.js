exports.view = function(req, res){
	var userid = req.session.userid;
	var classname = req.query.name;
	var sort = req.query.sort;
	var db = require("../db");
	var hasGroups = false;
    db.getGroup(function (groups) {
    	if(groups) {
    		console.log(groups);
    		if(groups.length > 0) {
    			hasGroups = true;
    		}
    		if (sort === "sort_end") {
    			groups = sortByEndTime(groups);
    		} else {
    			groups = sortByStartTime(groups);
    		}
    		groups = replaceTimes(groups);
    		groups = markIfBelongsTo(groups, userid);
			res.render('map', {
			'title' : classname,
			'data' : groups,
			'hasGroups' : hasGroups
			});
        }
    }, classname);
};

exports.sort = function(req, res){
	var userid = req.session.userid;
	var classname = req.params.classname;
	var sort = req.params.sort;
	var db = require("../db");
	var hasGroups = false;
    db.getGroup(function (groups) {
    	if(groups) {
    		if(groups.length > 0) {
    			hasGroups = true;
    		}
    		if(sort === "sort_start") {
    			groups = sortByStartTime(groups);
    		} else if (sort === "sort_end") {
    			groups = sortByEndTime(groups);
    		}
    		groups = replaceTimes(groups);
    		groups = markIfBelongsTo(groups, userid);
			res.render('map', {
			'title' : classname,
			'data' : groups,
			'hasGroups' : hasGroups
			});
        }
    }, classname);
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

function sortByStartTime(groups) {
	groups.sort(function (group1, group2) {
		var dateObject1 = new Date(Date.parse(group1.startTime));
		var dateObject2 = new Date(Date.parse(group2.startTime));
		return dateObject1 - dateObject2;
	});
	return groups;
}

function sortByEndTime(groups) {
	groups.sort(function (group1, group2) {
		var dateObject1 = new Date(Date.parse(group1.endTime));
		var dateObject2 = new Date(Date.parse(group2.endTime));
		return dateObject1 - dateObject2;
	});
	return groups;
}


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

