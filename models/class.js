var course_setup = require('../routes/course_setup');

exports.addClass = function(req, res) {
        //check if class is already there
        //if there, add userid to array $addToSet
        //if not make a new class
        var classname = req.query.name;
        var userid = req.session.userid;
        console.log(classname);
  		console.log(userid);


        //add new user by calling the model
        var db = require("../db")

        db.getClass(function (response) {
            if(response == '') {
                console.log('about to create class');
                //create class
                db.createClass(function (response) {
                    if (response) {
                         res.redirect("/home");
                    }
                 }, classname, userid);
            } else { //class already in db
                console.log("class already in db: " + response);
                db.updateClass(function (response) {
                    if (response) {
                        console.log(response)
                        res.redirect("/home");
                    }
                 }, classname, userid);

            }
        }, classname);
};

exports.getClasses = function(req, res) {
        var userid = req.session.userid;
        console.log(userid);
        var db = require("../db")
        db.getUserClasses(function (response) {
            if(response) {
                console.log(response);
                //create class
            } 
        }, userid);     
};

/* Removes user from this class */
exports.removeClass = function(req, res) {
    var userid = req.session.userid;
    var classname = req.params.classname;   
    var db = require("../db")
    db.removeClass(function (response) {
        if (response) {
            console.log(response)
            res.send('sucessfully removed');
        }
    }, classname, userid);    
};

