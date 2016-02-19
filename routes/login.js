 
var models = require('../models');
var std = require("../std");
/*
 * GET home page.
 */

exports.loginPage = function(req, res){
	if (req.body.email) {
        models.User.find({email: req.body.email, password: req.body.password}).exec(afterLogin);

        function afterLogin(err, user) {
        	console.log(user);
        	if (user.length > 0) { // HOADO: PREVENT MULTIPLE USERS WITH SAME EMAIL
        		req.session.user = user[0];
        	    res.json({"success": true});
        	} else {
                res.json({"error": "Bad email/password combination", "success": false});
        	}
        }
	} else {
        res.json({"error": "No information entered", "success": false});
	}
	
};

exports.signupPage = function(req, res) {
    if (req.body.name) {
        var newUser = new models.User(
            {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "imageUrl": "http://qualiadesigns.com/wp-content/uploads/qdi-generic-testimonial-person.png",
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
        models.User.find({email: req.body.email}).exec(afterCheck);

        function afterCheck(err, user) {
            if (user.length > 0) { // HOADO: PREVENT MULTIPLE USERS WITH SAME EMAIL
                res.json({'error': "This email has already been registered", "success": false});
            } else {
                req.session.user = newUser;
                newUser.save(afterSaving);
                
                function afterSaving(err) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({'success': true});
                }
            }
    		
        }
        
    } else {
    	res.json({'error': "Please fill out all the fields", "success": false});
    }
}

exports.logoutPage = function(req, res) {
	req.session.reset();
    res.render('logout');
}

// Steps pipeline
exports.step1Page = function(req, res) {
    if (req.body.url) {

        models.User.update({_id: req.session.user._id}, {
            "imageUrl": req.body.url,
            "okayFriends": req.body.f,
            "okayFOF": req.body.fof,
            "okayAny": req.body.any,
            "needFriend": req.body.req },
            function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("success");
                res.json({'success': true});
            }
        )

    } else {
        res.json({'error': "An unexpected error has occurred", "success": false});
    }
}

exports.step2Page = function(req, res) {
    if (req.body.d1) {
        console.log(res.body);
        if (req.session.location) {
            models.Location.remove({_id: req.session.location._id},
                function(err, data) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
        var newLoc = new models.Location(res.body);
        newLoc.save(afterLocSaving);
        function afterLocSaving(err) {
            if (err) {
                console.log(err);
            }
            models.User.update({_id: req.session.user._id}, {
                "location": newLoc._id
            }, function(err) {
                if (err) {
                    console.log(err);
                }
                res.json({'success': true});
            });
            
        }
    } else {
        res.json({'error': "An unexpected error has occurred", "success": false});
    }
    
}

exports.step3Page = function(req, res) {
    if (req.body.action) {
        if (req.body.action == "search") {
            if (req.body.query.indexOf("@") >= 0) {
                models.User.find({email: new RegExp(req.body.query, 'i') }).exec(afterFind);
            } else {
                models.User.find({name: new RegExp(req.body.query, 'i') }).exec(afterFind);
            }
            

            function afterFind(err, found) {
                // console.log(found);
                models.Friend.find({
                    "person": req.session.user._id
                }).exec(afterFilter);
                function afterFilter(err, repeats) {
                    var ret = [];
                    for (var i = 0; i < found.length; i++) {
                        var toAdd = true; 
                        for (var j = 0; j < repeats.length; j++) {
                            if ("" + repeats[j].friend == "" + found[i]._id) { // objectId is different from id
                                toAdd = false;
                            }
                        }
                        if (toAdd && req.session.user._id != found[i]._id) {
                            ret.push(found[i]);
                        }
                    }
                    res.json({'success': true, 'found': ret});
                }
            }
        } else if (req.body.action == "add") {
            if (req.session.user._id == req.body.id) {
                res.json({'error': "Sorry, you can't be friends with yourself", "success": false});
                return;
            }
            models.Friend.find({
                "person": req.session.user._id,
                "friend": req.body.id
            }).exec(afterPrevent);

            function afterPrevent(err, amt) {
                if (amt.length > 0) {
                    res.json({'error': "You are already friends with this person", "success": false});
                } else {
                    var newFriend = new models.Friend({
                        "person": req.session.user._id,
                        "friend": req.body.id,
                        "status": 0
                    });
                    var newFriend2 = new models.Friend({
                        "person": req.body.id,
                        "friend": req.session.user._id,
                        "status": 0
                    });
                    newFriend.save(afterAdding);
                    newFriend2.save(function(err) {});
                    function afterAdding(err) {
                        if (err) {
                            console.log(err);
                        }
                        res.json({'success': true});
                    }
                }
                
            }
            

        }
    } else {
        res.json({'error': "An unexpected error has occurred", "success": false});
    }
    
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