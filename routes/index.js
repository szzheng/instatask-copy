
var models = require('../models');
var std = require("../std");

/*
 * GET home page.
 */

exports.view = function(req, res){
  var obj = {};
  obj["dining"] = diningNames;
  obj["nondining"] = nondiningNames;
  if (req.session.user) {
    obj["loggedin"] = true;
  }
  
  obj["caltimes"] = [{"time": "7AM", "timeIndex": "0"},
  {"time": "", "timeIndex": "1"},
  {"time": "8AM", "timeIndex": "2"},
  {"time": "", "timeIndex": "3"},
  {"time": "9AM", "timeIndex": "4"},
  {"time": "", "timeIndex": "5"},
  {"time": "10AM", "timeIndex": "6"},
  {"time": "", "timeIndex": "7"},
  {"time": "11AM", "timeIndex": "8"},
  {"time": "", "timeIndex": "9"}
  ];
  //obj["caltimes2"] = [12,1,2,3,4,5,6,7,8,9,10];
  //obj["caltimes"] = [7, 8, 9, 10, 11, 12, 13];
  
  obj["caltimes2"] = [{"time": "12PM", "timeIndex": "10"},
  {"time": "", "timeIndex": "11"},
  {"time": "1PM", "timeIndex": "12"},
  {"time": "", "timeIndex": "13"},
  {"time": "2PM", "timeIndex": "14"},
  {"time": "", "timeIndex": "15"},
  {"time": "3PM", "timeIndex": "16"},
  {"time": "", "timeIndex": "17"},
  {"time": "4PM", "timeIndex": "18"},
  {"time": "", "timeIndex": "19"},
  {"time": "5PM", "timeIndex": "20"},
  {"time": "", "timeIndex": "21"},
  {"time": "6PM", "timeIndex": "22"},
  {"time": "", "timeIndex": "23"},
  {"time": "7PM", "timeIndex": "24"},
  {"time": "", "timeIndex": "25"},
  {"time": "8PM", "timeIndex": "26"},
  {"time": "", "timeIndex": "27"},
  {"time": "9PM", "timeIndex": "28"},
  {"time": "", "timeIndex": "29"},
  {"time": "10PM", "timeIndex": "30"},
  {"time": "", "timeIndex": "31"},
  ];

  /*
  // Cal indices
  obj["calindices"] = new Array();
  for (var i = 0; i < 10; i = i + 2) {
    obj["calindices"].push(i);
  }
  obj["calindices2"] = new Array();
  for (var j = 10; j < 32; j = j + 2) {
    obj["calindices"].push(j);
  }*/

/*
  res.render('index', {'caltimes': [{"time": "7", "timeIndex": "0"},
  {"time": " ", "timeIndex": "1"},
  {"time": "8", "timeIndex": "2"},
  {"time": " ", "timeIndex": "3"},
  {"time": "9", "timeIndex": "4"},
  {"time": " ", "timeIndex": "5"},
  {"time": "10", "timeIndex": "6"},
  {"time": " ", "timeIndex": "7"},
  {"time": "11", "timeIndex": "8"},
  {"time": " ", "timeIndex": "9"}
  ]});

  res.render('index', {'caltimes2': [{"time": "12", "timeIndex": "10"},
  {"time": "", "timeIndex": "11"},
  {"time": "1", "timeIndex": "12"},
  {"time": "", "timeIndex": "13"},
  {"time": "2", "timeIndex": "14"},
  {"time": "", "timeIndex": "15"},
  {"time": "3", "timeIndex": "16"},
  {"time": "", "timeIndex": "17"},
  {"time": "4", "timeIndex": "18"},
  {"time": "", "timeIndex": "19"},
  {"time": "5", "timeIndex": "20"},
  {"time": "", "timeIndex": "21"},
  {"time": "6", "timeIndex": "22"},
  {"time": "", "timeIndex": "23"},
  {"time": "7", "timeIndex": "24"},
  {"time": "", "timeIndex": "25"},
  {"time": "8", "timeIndex": "26"},
  {"time": "", "timeIndex": "27"},
  {"time": "9", "timeIndex": "28"},
  {"time": "", "timeIndex": "29"},
  {"time": "10", "timeIndex": "30"},
  {"time": "", "timeIndex": "31"},
  ]});*/

  res.render('index', obj);
  /*
    if (!req.session.user) {
      res.redirect("/login");
    } else {
    	res.render('index');
    }
  */
};





/*
exports.view = function(req, res){

    if (!req.session.user) {
       res.redirect("/login");
    } else {
      
      //models.User.find().exec(function(err, us) {console.log(us); res.render('index');});
      
       var filters = {'owner':req.session.user._id, 'status': "in progress"};
       var ff = {};
       if (req.body.status == "completed") {
            filters['status'] = "completed";
            ff['stat2'] = true;
       }

       var checks = ["durre", "durrm", "durrh", "diffe", "diffm", "diffh"];
       for (var i = 0; i < checks.length; i++) {
                  if (req.body.tofilter) {
                        if (req.body[checks[i]]) { 
                              ff[checks[i]] = true;
                        }
                  } else {
                        ff[checks[i]] = true;
                  }
       }

       filters['difficulty'] = {$in: []};
       if (ff["diffe"]) {
              filters['difficulty']["$in"].push("easy");
       }
       if (ff["diffm"]) {
              filters['difficulty']["$in"].push("medium");
       }
       if (ff["diffh"]) {
              filters['difficulty']["$in"].push("hard");
       }

       if (req.body.category && req.body.category != "All") {
              filters['category'] = req.body.category;
       }

       if (req.body.location && req.body.location != "All") {
              filters['location'] = req.body.location;
       }

       ff["mindurr"] = 0;
       ff["maxdurr"] = 10;
       if (req.body.mindurr) {
          ff["mindurr"] = req.body.mindurr;
       }
       if (req.body.maxdurr) {
          ff["maxdurr"] = req.body.maxdurr;
       }
       if (ff["mindurr"] != 0 || ff["maxdurr"] != 10) {
              if (ff["maxdurr"] == 10) {
            filters['duration'] = {$gte: ff["mindurr"]};
              } else {
                  filters['duration'] = {$gte: ff["mindurr"], $lte: ff["maxdurr"] };
              }

       }
       console.log("filters: ", filters)
       
       models.Task.find({'owner':req.session.user._id}).exec(
              function (err2, task2) {
                  // this code handles the listing all task categories and location for this user
                  ff["cats"] = []; seencats = {};
                  ff["locs"] = []; seenlocs = {};
                  for (var i = 0; i < task2.length; i++) {
                        if (!seencats[task2[i].category]) {
                              seencats[task2[i].category] = true;
                              if (task2[i].category == req.body.category) {
                                    ff["cats"].push({'cat':task2[i].category, 'sel':true});
                              } else {
                                    ff["cats"].push({'cat':task2[i].category});
                              }
                        }
                        if (!seenlocs[task2[i].location]) {
                              seenlocs[task2[i].location] = true;
                              if (task2[i].location == req.body.location) {
                                    ff["locs"].push({'loc':task2[i].location,'sel':true});
                              } else {
                                    ff["locs"].push({'loc':task2[i].location});
                              }
                              
                        }
                  }
                  ff["cats"].sort(); ff["locs"].sort();

                  models.Task
                  .find(filters)
                  .exec(renderTasks); 

                function renderTasks(err, tasks) {
                        console.log(tasks);

                        obj = { 'tasks': tasks, 'filters': filters, 'ff': ff };

                        res.render('index', obj);
                  }
              }
       );

       
    }

};
*/