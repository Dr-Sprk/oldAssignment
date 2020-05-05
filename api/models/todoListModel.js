'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  id: {
    type: String
  },
  desc: {
    type: String
  },
  category: {
  	type: String
  },
  createDate: {
  	type: String
  },
  dueDate: {
  	type: String
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);