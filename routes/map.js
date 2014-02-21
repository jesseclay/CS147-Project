exports.view = function(req, res){
	var classname = req.query.name;
	var db = require("../db")
	console.log("classname: " + classname);
    db.getGroup(function (groups) {
    	if(groups) {
    		groups = sortByStartTime(groups);
    		groups = replaceTimes(groups);
			res.render('map', {
			'title' : classname,
			'data' : groups
			});
        }
    }, classname);
};

exports.sort = function(req, res){
	var classname = req.params.classname;
	var sort = req.params.sort;
	console.log("SORT: " + sort);
	var db = require("../db")
	console.log("classname: " + classname);
    db.getGroup(function (groups) {
    	if(groups) {
    		if(sort === "sort_start") {
    			groups = sortByStartTime(groups);
    		} else if (sort === "sort_end") {
    			groups = sortByEndTime(groups);
    		}
    		groups = replaceTimes(groups);
			res.render('map', {
			'title' : classname,
			'data' : groups
			});
        }
    }, classname);
};

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
	console.log(groups);
	return groups;
}


function putInTimeFormat(dateObject) {
	var hour = dateObject.getHours();
	var minutes = dateObject.getMinutes().toString();
	var time = hour + ":" + minutes;
	if(minutes < 10) {
		time = hour + ":" + minutes + "0";
	}
	return time;
}

// function convertToPSTHours(utcHourString) {
//     var utcHour = parseInt(utcHourString);
//     var pstHour = utcHour - 8;
//     if(pstHour <= 0) {
//         pstHour = 24 + pstHour;
//     } 
//     return pstHour;
// }
