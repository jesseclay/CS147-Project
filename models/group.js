exports.addGroup = function(req, res) {
        console.log("start date" + req.query.start_date);
        var start_time = getDateTimeObject(req.query.start_time, req.query.start_date);
        var end_time = getDateTimeObject(req.query.end_time, req.query.end_date);
        // console.log("DATE PARSED START: " + start_time);
        // console.log("DATE PARSED END: " + end_time);
        var creatorid = req.session.userid;
        var classname = req.query.classname;
        var name = req.query.groupname;
        var start_time = start_time;
        var end_time = end_time;
        var location = req.query.location;
        var db = require("../db")
		db.createGroup(function (response) {
            if (response) {
                res.redirect("/map?name=" + classname);
            }
        }, classname, name, start_time, end_time, location, creatorid);
};


function getDateTimeObject(time, date) {
    console.log("TIME PASSED IN: " +  time);
    var timeComponents = time.replace(/\s.*$/, '').split(':');
    var pattern = new RegExp("(\\d?\\d):(\\d\\d)(am|pm)", 'i');
    // var pattern = new RegExp("\\d", "i");
    console.log("TEST: " + pattern.test(time));
    console.log("pattern: " + pattern.toString());
    // if(pattern.test(time)) {
        var suffix = pattern.exec(time);
        console.log("suffix: " + suffix);
    // }
    console.log(timeComponents[0]);
    console.log(timeComponents[1]);
    var dateComponents = date.split('/');
    var month = dateComponents[0];
    var date = dateComponents[1];
    var year = dateComponents[2];
    var date = new Date();
    date.setDate(date);
    date.setMonth(month);
    date.setFullYear(year);
    // var hour = convertToUTCHours(timeComponents[0]);
    var hour = timeComponents[0]
    date.setHours(hour);
    date.setMinutes(timeComponents[1]);
    return date;
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
