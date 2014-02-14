
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var uristring =
// process.env.MONGOLAB_URI ||
// process.env.MONGOHQ_URL ||
// 'mongodb://localhost/HelloMongoose';

var index = require('./routes/index');
var home = require('./routes/home');
var course_setup = require('./routes/course_setup');
var sign_up = require('./routes/sign_up');
var messages = require('./routes/messages');
var map = require('./routes/map');
var post_group = require('./routes/post_group');
var user = require('./models/user');


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//init database and schemas
require('./db').createConnection();


// Add routes here
app.get('/', index.view);
app.get('/home', home.view);
app.get('/course_setup', course_setup.view);
app.get('/course_add', course_setup.add);
app.get('/sign_up', sign_up.view);
app.get('/messages', messages.view);
app.get('/map', map.view);

app.get('/post_group', post_group.view);
app.get('/post_group_add', post_group.add);

app.get('/create_new_user', user.addUser);
app.get('/login', user.validateLogin);
app.get('/logout', user.logout);



// Example route
// app.get('/users', user.list);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
