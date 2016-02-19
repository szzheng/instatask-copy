
var models = require('../models');

/*
 * GET home page.
 */

exports.loginPage = function(req, res){
	if (req.body.email) {
        models.User.find({email: req.body.email, password: req.body.pass}).exec(afterLogin);

        function afterLogin(err, user) {
        	console.log(user);
        	if (user.length > 0) { // HOADO: PREVENT MULTIPLE USERS WITH SAME EMAIL
        		req.session.user = user[0];
        	    res.redirect('/');
        	} else {
                res.render('login', {"error": "Bad email/password combination"});
        	}
        }
	} else {
		res.render('login');
	}
	
};

exports.signupPage = function(req, res) {
    if (req.body.name) {
		var newUser = new models.User(
		    {
			    "name": req.body.name,
				"email": req.body.email,
				"password": req.body.pass,
                "imageUrl": "",
                "attendence": 0,
                "aamount": 0,
                "rating": 0,
                "ramount": 0,

                "okayFriends": true,
                "okayFOF": true,
                "okayAny": false,
                "needFriend": true
		    }
		);
		req.session.user = newUser;
		newUser.save(afterSaving);
		
        function afterSaving(err) {
        	if (err) {
        		console.log(err);
        	}
        	res.redirect('step1');
        }
        
    } else {
    	res.render('signup');
    }
}

exports.logoutPage = function(req, res) {
	req.session.reset();
    res.render('logout');
}

// Steps pipeline
exports.step1Page = function(req, res) {
    res.render('step1');
}

exports.step2Page = function(req, res) {
    res.render('step2');
}

exports.step3Page = function(req, res) {
    res.render('step3');
}

exports.step4Page = function(req, res) {
    res.render('step4');
}

exports.welcomePage = function(req, res) {
    res.render('welcome');
}

exports.settingsPage = function(req, res) {


    res.render('settings');
}