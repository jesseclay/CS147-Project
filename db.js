var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//if pushing to heroku. else
//mongoose.connect(process.env.MONGOHQ_URL);


var db;
var userSchema;
var User;
var groupSchema;
var Group;
var classSchema;
var Class;




module.exports = {

	createConnection: function (){
    	db = mongoose.connection;
    	db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
  			console.log("MonogoDB Connected");
		});

		//INIT SCHEMAS

		//USER
		userSchema = mongoose.Schema({
    		name: String,
    		email: String,
    		password: String
		})
		
		User = mongoose.model('User', userSchema)

		//GROUP
		groupSchema = mongoose.Schema({
    		classname: String,
    		name: String,
    		startTime: String,
    		endTime: String,
    		location: String,
    		creatorid: String,
    		memberids : [mongoose.Schema.Types.ObjectId]
		})

		Group = mongoose.model('Group', groupSchema)
		
		//CLASS
		classSchema = mongoose.Schema({
			classname: String,
			userids : [mongoose.Schema.Types.ObjectId]
		})

		Class = mongoose.model('Class', classSchema);
  	},

  	insertUser: function (callback, name, email, password) {
  		console.log(name);
  		console.log(email);
  		console.log(password);
		var newUser = new User({ name: name, email: email, password: password});
		newUser.save(function (err, fluffy) {
			if (err) console.log(err);//handle the error
			callback(newUser._id);
		});
		console.log("before save " + newUser);
		
  	},


  	getClass: function (callback, classname) {
  		var changedClassname = classname.toUpperCase().replace(/\s+/g, '');
		console.log('hit get class: ' + changedClassname);
		Class.find({classname: changedClassname}, function (err, Class) {
			console.log("class get: " + Class)
			if (err) {
				callback('none');
			}
			if(Class) {
				callback(Class);
			} else {
				callback("");
			}
		});
  	},

  	createClass: function (callback, classname, userid) {
  		console.log('userid: ' + userid);
  		var changedClassname = classname.toUpperCase().replace(/\s+/g, '');
		var newClass = new Class;
		newClass.classname = changedClassname;
		newClass.userids = [userid];
		({classname: changedClassname, userids : userid});
		newClass.save(function (err, group) {
			if (err) {
				console.log(err);//handle the error
			} else {
				callback("success");
			}	
		});
		console.log("hit create class save " + newClass);
		
  	},

  	updateClass: function (callback, classname, userid) {
  		var changedClassname = classname.toUpperCase().replace(/\s+/g, '');
  		var conditions = { classname: changedClassname };
  		var update = { $addToSet: { userids:userid }};
  		var options = { multi: true };
  		Class.update(conditions, update, options, function (err) {
  			if(err) {
  				callback(err);
  			} else {
  				callback("sucess!! :)");
  			}
  		});
  	},

  	getUserClasses: function (callback, userid) {
		Class.find({'userids': userid}, function (err, classObject) {
			if (err) {
				callback('error');
			}
			if(Class) {
				callback(classObject);
			}
		});
  	},


  	createGroup: function (callback, classname, name, start_time, end_time, location, creatorid) {
  
		var newGroup = new Group({ classname: classname, name: name, startTime: start_time, endTime: end_time, location: location, creatorid: creatorid});
		newGroup.memberids = [creatorid]
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


