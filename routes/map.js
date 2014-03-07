
exports.view = function(req, res){
	var userid = req.session.userid;
	if(userid === undefined) {
    	res.render('index');
    }
	var classname = req.query.name;
	var sort = req.query.sort;
	var db = require("../db");
	var hasGroups = false;

	var sortByStart = true;

    db.getGroup(function (groups) {
    	if(groups) {
    		console.log(groups);
    		if(groups.length > 0) {
    			hasGroups = true;
    		}
    		if (sort === "sort_end") {
    			groups = sortByEndTime(groups);
    			sortByStart = false;
    		} else if (sort == "sort_distance") {
    			var my_lng = req.query.lng;
    			//console.log(my_lng);
				var my_lat = req.query.lat;
    			groups = sortByDistance(groups, my_lng, my_lat);
    		} else {
    			groups = sortByStartTime(groups);
    		}
    		groups = replaceTimes(groups);
    		groups = markIfBelongsTo(groups, userid);
			res.render('map', {
			'title' : classname,
			'data' : groups,
			'hasGroups' : hasGroups,
			'sortByStart' : sortByStart,
			'alternate' : false
			});
        }
    }, classname);
};

exports.alternateView = function(req, res){
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
    		} else if (sort === "sort_distance") {
    			groups = sortByDistance(groups);
    		} else {
    			groups = sortByStartTime(groups);
    		}
    		groups = replaceTimes(groups);
    		groups = markIfBelongsTo(groups, userid);
			res.render('map', {
			'title' : classname,
			'data' : groups,
			'hasGroups' : hasGroups,
			'alternate' : true
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
	var sortByStart = true;
	console.log("HIT SORT");
    db.getGroup(function (groups) {
    	if(groups) {
    		if(groups.length > 0) {
    			hasGroups = true;
    		}
    		if(sort === "sort_start") {
    			groups = sortByStartTime(groups);
    		} else if (sort === "sort_end") {
    			sortByStart = false;
    			console.log("HITTTTT FALSE")
    			groups = sortByEndTime(groups);
    		}
    		groups = replaceTimes(groups);
    		groups = markIfBelongsTo(groups, userid);
			res.render('map', {
			'title' : classname,
			'data' : groups,
			'hasGroups' : hasGroups,
			'sortByStart' : sortByStart 
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



function calculateDistance(g_long, g_lat, my_lng, my_lat) {
	var dx = Math.pow( (my_lng - g_long), 2);
	var dy = Math.pow( (my_lat - g_lat), 2);
	var dist = Math.sqrt(dx + dy);
	return dist;
}

function sortByDistance(groups, my_lng, my_lat){
	groups.sort(function (group1, group2) {
		var x1 = Math.abs(group1.longitude);
		var y1 = Math.abs(group1.latitude);
		var x2 = Math.abs(group2.longitude);
		var y2 = Math.abs(group2.latitude);
		
		d1 = calculateDistance(x1, y1, my_lng, my_lat);
		d2 = calculateDistance(x2, y2, my_lng, my_lat);
		return d1 - d2;
	});
	console.log(groups);
	//console.log(my_lng);
	//console.log(my_lat);
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

