
var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	

    if (!req.session.user) {
       res.redirect("/login");
    } else {
    	/*
    	models.User.find().exec(function(err, us) {console.log(us); res.render('index');});
    	*/
       models.Task
		.find({'owner':req.session.user._id, "status": "in progress"})
		.exec(renderTasks); 
    }
    

	function renderTasks(err, tasks) {
		console.log(tasks);
		res.render('index', { 'tasks': tasks });
	}

};