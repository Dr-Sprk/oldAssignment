'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  fs = require('fs'),
  todoTasks = JSON.parse(fs.readFileSync('api/todoList.json')),
  path = require('path');

exports.webDirectory = (req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/index.html'));
};

//Node.js JSON Manipulation functions (self explanatory)
exports.resAllTasks = (req, res) => {
  res.json(todoTasks);
};

exports.welcome = (req, res) => {
  res.send('Welcome to Just Do It, you Node.js application for all your To Do List needs.');
};

exports.deleteTask = (req, res) => {
  for (var i = 0, l = todoTasks.length; i < l; i++) {
    if (Number(todoTasks[i].id) == Number(req.params.taskId)) {
      todoTasks.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync('api/todoList.json', JSON.stringify(todoTasks));
  res.json(todoTasks);
};

exports.addTask = (req, res) => {
  var task = {};
  task.id = req.query.id;
  task.desc = req.query.desc;
  task.category = req.query.category
  task.createDate = req.query.createDate;
  task.dueDate = req.query.dueDate;
  var okId;
  for (var i = 0, l = todoTasks.length; i < l; i++) {
    if (todoTasks[i].id == req.query.id) {
      okId = false;
      break;
    }
  }
  if (isNaN(req.query.id)) {
    res.send('Please choose an integral ID (only integers are supported!)')
  } else if (okId == false) {
    res.send('Please choose a different ID as this one is already in use!');
  } else {
    res.json(task);
    JSON.stringify(task);
    todoTasks.push(task);
    fs.writeFileSync('api/todoList.json', JSON.stringify(todoTasks));
  }
};


exports.example = (req, res) => {
  var exampleObj = {
    "id": "01",
    "desc": "Complete Learn Node Lessons 1-10"
  }
  res.json(exampleObj);
};


//MongoDB Functions
exports.addTaskMongo = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.deleteTaskMongo = function(req, res) {
  Task.deleteOne({
    id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ "n": 1, "ok": 1 });
  });
};

exports.resAllTasksMongo = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};