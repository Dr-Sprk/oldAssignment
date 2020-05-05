var express = require('express'),
  server = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:Password1@cluster-default-nypwv.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }); 


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(server); //register the route

server.use(express.static('public'));
server.listen(port);

var time = new Date

console.log('The Just Do It Todo list server was started on port ' + port + ' at ' + time);