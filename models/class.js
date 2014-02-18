exports.addClass = function(req, res) {
        //check if class is already there
        //if there, add userid to array $addToSet
        //if not make a new class

    //   userids : [{
    //  userid : Number
    //  }]

        var creatorid = req.session.userid;
        console.log(classname);
  		console.log(name);
  		console.log(start_time);
        console.log(end_time);
        console.log(location);
        console.log(creatorid);

        //add new user by calling the model
        var db = require("../db")
		db.createGroup(function (response) {
            if (response) {

                res.redirect("/map?name=" + classname);

            }

        }, classname, name, start_time, end_time, location, creatorid);
};