exports.view = function(req, res){
	var classname = req.query.name;
	var db = require("../db")
	console.log("classname: " + classname);
    db.getGroup(function (groups) {
    	if(groups) {
    		groups = sortAndReplaceGroups(groups);
			res.render('map', {
			'title' : classname,
			'data' : groups
			});
        }
    }, classname);
};


function sortAndReplaceGroups(groups) {
	//first sort by time
	groups.sort(function (group1, group2) {
		var dateObject1 = new Date(Date.parse(group1.startTime));
		var dateObject2 = new Date(Date.parse(group2.startTime));
		return dateObject1 - dateObject2;
	});
	for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		console.log("startTime: " + group.startTime);
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
	// hour = convertToPSTHours(hour).toString();
	console.log("hour: " + hour);
	var minutes = dateObject.getMinutes().toString();
	console.log("minutes: " + minutes);
	var time = hour + ":" + minutes;
	if(minutes < 10) {
		time = hour + ":" + minutes + "0";
	}
	console.log("FINAL TIME: " + time);
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