var data = require('../data.json');

exports.addFriend = function(req, res) {    
	var filtered_friends = data.friends;
	var name = req.query.name;
	var description = req.query.name;
	var newFriend = {"name": name,
			"description": description,
			"imageURL": "http://lorempixel.com/400/400/people"};
			console.log(newFriend);
	data["friends"].push(newFriend);
	res.render('add', newFriend);
	
 };