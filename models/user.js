exports.addUser = function(req, res) {
        var name = req.query.name;
        var email = req.query.email;
        var password = req.query.password;
        console.log(name);
  		console.log(email);
  		console.log(password);
        //add new user by calling the model
        var db = require("../db");
		db.insertUser(function (userid) {
        	req.session.email = email;
			req.session.name = name;
			req.session.userid = userid;
        	res.redirect('home');
        }, name, email, password);
};

exports.getUser = function(req, res) {
	var db = require("../db")
	// db.insertUser("Queef");
	db.getUsers(function (users) {
		if(users) {
			console.log("returned: " + users[0]['name']);
		}
	});
};

exports.validateLogin = function(req, res) {
	var db = require("../db")
	var email = req.query.email;
    var password = req.query.password;
    db.getUser(function (user) {
		if(user) {
			console.log("got it back password: " + user['password'] + " entered: " + password);

			if(password === user['password'])
			{
				req.session.email = email;
				req.session.name = user['name'];
				console.log("here " + req.session.email);
				res.redirect('home');
			} else {
				res.render('index', {'error':' Invalid username and password'});
			}
		} else {
			res.render('index', {'error':' Invalid username and password'});
		}
	}, email);
}

exports.logout = function(req, res) {
	req.session.destroy();
	res.render('index');
};


