var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
mongoose.connect(MONGOHQ_URL);

var db;
var userSchema;
var User;
var groupSchema;
var group;




module.exports = {

	createConnection: function (){
    	db = mongoose.connection;
    	db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
  			console.log("MonogoDB Connected");
		});

		//INIT SCHEMAS
		userSchema = mongoose.Schema({
    		name: String,
    		email: String,
    		password: String
		})
		
		User = mongoose.model('User', userSchema)

		groupSchema = mongoose.Schema({
    		classname: String,
    		assignment: String,
    		start_time: String,
    		end_time: String,
		})
		
		Group = mongoose.model('Group', groupSchema)
		//need to make a callback for this model
		//user
  	},

  	insertUser: function (name, email, password) {
  		console.log(name);
  		console.log(email);
  		console.log(password);
		var newUser = new User({ name: name, email: email, password: password});
		newUser.save(function (err, fluffy) {
			if (err) console.log("error saving");//handle the error
		});
		console.log("before save " + newUser);
  	},


  	createGroup: function (classname, assignment, start_time, end_time) {
  
		var newGroup = new Group({ classname: classname, assignment: assignment, start_time: start_time, end_time: end_time});
		newUser.save(function (err, fluffy) {
			if (err) console.log("error saving");//handle the error
		});
		console.log("before save " + newGroup);
  	},

  	getUsers: function (callback) {
  		console.log('hit');
		User.find(function (err, users) {
			if (err) {
				console.log('error');
			}
			if(users) {
				callback(users);
			}
		})
  	},


  	getUser: function (callback, email) {
  		console.log('hit');
  		User.findOne({email: email}, function(err, user) {
  			if (err) {
				console.log('error');
			}
			callback(user);
		});
  	}



}


