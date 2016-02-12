
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
  "title": String,
	"date": String,
	"summary": String,
	"image": String
});

exports.Project = Mongoose.model('Project', ProjectSchema);

var UserSchema = new Mongoose.Schema({
	"name": String,
	"email": String,
	"password": String,
	"categories": [String],
	"locations": [String]
});

exports.User = Mongoose.model('User', UserSchema);

var TaskSchema = new Mongoose.Schema({
	"title": String,
	"location": String,
	"difficulty": String,
	"duration": Number,
    "category": String
});

exports.User = Mongoose.model('Task', UserSchema);



