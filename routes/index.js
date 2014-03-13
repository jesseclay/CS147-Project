exports.view = function(req, res){
	var userid = req.session.userid;
	if(userid !== undefined) {
    	res.render('home');
    } else {
		res.render('index');
	}
};


 