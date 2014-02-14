exports.addGroup = function(req, res) {
        var classname = req.query.classname;
        var name = req.query.groupname;
        var start_time = "11:00am";
        var end_time = "12:00pm";
        var location = req.query.location;
        var salt = Math.floor((Math.random()*1000)+1);
        var id = (classname+name+start_time+end_time+location+salt).hashCode();

        console.log(classname);
  		  console.log(name);
  		  console.log(start_time);
        console.log(end_time);
        console.log(location);
        console.log(id);

        //add new user by calling the model
        var db = require("../db")
		db.createGroup(classname, name, start_time, end_time, location, id);
        db.getGroup(function (groups) {
            if(groups) {
                console.log("check" + groups);
                res.render('map', {
                'title' : classname,
                'data' : groups
                });
            }
        }, classname);
};

exports.getGroup = function(req, res) {
    var db = require("../db")
    db.getGroup(function (group) {
        if(group) {
            console.log("returned: " + group);
        }
    });
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
