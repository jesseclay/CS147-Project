exports.addClass = function(req, res) {
        //check if class is already there
        //if there, add userid to array $addToSet
        //if not make a new class

        var classname = req.query.classname;
        var userid = req.session.userid;
        console.log(classname);
  		console.log(userid);


        //add new user by calling the model
        var db = require("../db")

        db.getClass(function (response) {
            if(response == 'none') {
                //create class
                db.createClass(function (response) {
                    if (response) {
                        res.redirect("/home" + classname);
                    }
                 }, classname, userid);
            } else {
                //add userid to array of object
            }
        }, classname);

		
};