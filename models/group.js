exports.addGroup = function(req, res) {
        console.log("start date" + req.query.start_date);
        var start_time = getDateTimeObject(req.query.start_time, req.query.start_date);
        var end_time = getDateTimeObject(req.query.end_time, req.query.end_date);
        // console.log("DATE PARSED START: " + start_time);
        // console.log("DATE PARSED END: " + end_time);
        var creatorid = req.session.userid;
        var classname = req.query.classname;
        var name = req.query.groupname;
        var location = req.query.location;
        if(location=="Custom Location") location = req.query.customLocationName;
        var latitude = parseFloat(req.query.latitude);
        var longitude = parseFloat(req.query.longitude);        

        var db = require("../db")
		db.createGroup(function (response) {
            if (response) {
                res.redirect("/map?name=" + classname);
            }
        }, classname, name, start_time, end_time, location, latitude, longitude, creatorid);
};


function getDateTimeObject(time, date) {
    var pattern = new RegExp("(\\d?\\d):(\\d\\d)(am|pm)", "i");
    var timeComponents = "";
    if(pattern.test(time)) {
        timeComponents = pattern.exec(time);
    }
    var hour = parseInt(timeComponents[1]);
    var minutes = timeComponents[2];
    var ampm = timeComponents[3];
    if(ampm === "pm" && hour != 12) {
        hour = hour + 12;
    }
    if(ampm === "am" && hour === 12) {
        hour = 0;
    }
    var dateComponents = date.split("/");
    var month = dateComponents[0];
    var day = dateComponents[1];
    var year = dateComponents[2];

    var newDate=new Date();
    newDate.setDate(day);
    newDate.setMonth(month - 1);
    newDate.setFullYear(year);
    // var hour = convertToUTCHours(timeComponents[0]);
    newDate.setHours(hour);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    return newDate;
}


// function convertToUTCHours(pstHourString) {
//     var pstHour = parseInt(pstHourString);
//     var utcHour = pstHour + 8;
//     if(utcHour > 23) {
//         utcHour = utcHour - 24;
//     } 
//     return utcHour;
// }

exports.getGroup = function(req, res) {
    var db = require("../db")
    db.getGroup(function (group) {
        if(group) {
            console.log("returned: " + group);
        }
    });
};

exports.joinGroup = function(req, res) {
    var db = require("../db")
    var userid = req.session.userid;
    var groupid = req.params.groupid;   
    db.joinGroup(function (response) {
        if(response) {
            console.log("returned: " + response);
             res.send('sucessfully joined');
        }
    }, groupid, userid);
};

exports.leaveGroup = function(req, res) {
    var db = require("../db")
    var userid = req.session.userid;
    var groupid = req.params.groupid; 
    db.leaveGroup(function (response) {
        if(response) {
            console.log("returned: " + response);
            res.send('sucessfully left group');
        }
    }, groupid, userid);
};


String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0, l = this.length; i < l; i++) {
        char  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
