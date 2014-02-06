// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	var filtered_friends = data.friends;
	res.render('index', { 'friend': filtered_friends });
};


