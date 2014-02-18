var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//if pushing to heroku. else
//mongoose.connect(process.env.MONGOHQ_URL);


var db;
var userSchema;
var User;
var groupSchema;
var Group;




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
    		name: String,
    		startTime: String,
    		endTime: String,
    		location: String,
    		id: String
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


  	createGroup: function (callback, classname, name, start_time, end_time, location, id) {
  
		var newGroup = new Group({ classname: classname, name: name, startTime: start_time, endTime: end_time, location: location, id: id});
		newGroup.save(function (err, group) {
			if (err) console.log("error saving");//handle the error
		});
		console.log("before save " + newGroup);
		callback("success");
  	},

  	getGroup: function (callback, classname) {
  		console.log('hit');
		Group.find({classname: classname}, function (err, groups) {
			if (err) {
				console.log('error');
			}
			if(groups) {
				callback(groups);
			}
		})
  	},

  	getGroups: function (callback, classname) {
		Group.find({classname: classname}, function (err, groups) {
			if (err) {
				console.log('error');
			}
			if(groups) {
				callback(groups);
			}
		})
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


