var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var userSchema;
var User;

var db;


module.exports = {

	createConnection: function (){
    	db = mongoose.connection;
    	db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
  			console.log("MonogoDB Connected");
		});

		//INIT SCHEMAS
		userSchema = mongoose.Schema({
    		name: String
		})
		
		User = mongoose.model('User', userSchema)
		//need to make a callback for this model
		//user
  	},

  	insertUser: function (string) {
		var newUser = new User({ name: string });
		newUser.save(function (err, fluffy) {
			if (err) console.log("error saving");//handle the error
		});
		console.log("before save " + newUser.name);
		// console.log(newUser.name);
		User.find(function (err, users) {
			if (err) {
				console.log('error');
			}
			console.log(users);
		})
  	},

  	getUsers: function () {
		User.find(function (err, users) {
			if (err) {
				console.log('error');
			}
			if(users) {
				console.log(users);
				return users;
			}
		})
  	}

}


