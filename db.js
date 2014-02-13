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
		User = mongoose.model('User', userSchema);
  	},

  	insertUser: function (string) {
		var newUser = new User({ name: string });
		console.log(newUser.name); 
  	}	

}


