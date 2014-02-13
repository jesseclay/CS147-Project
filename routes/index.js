 exports.view = function(req, res){
	res.render('index');


	var db = require("../db")
	// db.insertUser("Queef");

	// var users = db.getUsers();
	// console.log("returneDDDD " + users);
	db.getUsers();
	db.getUsers = function(req,res) {
    	console.log(res);
	}
	
};


 