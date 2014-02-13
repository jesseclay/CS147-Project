 exports.view = function(req, res){
	res.render('index');


	var db = require("../db")
	db.insertUser("Poopy face");
	
};


 