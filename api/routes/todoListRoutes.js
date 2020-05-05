'use strict';

module.exports = function(app) {
  var todoListFunc = require('../controllers/todoListController'),
  		fs = require('fs');


//MongoDB Routes
  app.route('/tasks')
    .get(todoListFunc.resAllTasksMongo)
    .post(todoListFunc.addTaskMongo);

  app.route('/tasks/:taskId')
    .delete(todoListFunc.deleteTaskMongo);


//Standard Node.js JSON file Routes
	app.get('/', todoListFunc.webDirectory)

  app.get('/welcome', todoListFunc.welcome);

  app.get('/example', todoListFunc.example)

  app.get('/list', todoListFunc.resAllTasks);

  app.get('/delete/:taskId', todoListFunc.deleteTask);

  app.get('/add', todoListFunc.addTask)

  app.get('/delete/:id', todoListFunc.deleteTask);


};