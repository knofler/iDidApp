/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Goal = require('../api/goal/goal.model');

// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

Goal.find({}).remove(function() {
  Goal.create(
  	{
    "goalName" : "Goal One",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2008-04-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2008-12-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Two",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2005-04-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2005-04-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Three",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2002-04-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2002-03-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Four",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2004-01-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2004-04-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Five",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2010-07-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2011-03-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Six",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2003-12-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2003-04-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal Seven",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2006-01-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2006-03-17T11:01:23.460Z",
    "isActive" : false
},{
    "goalName" : "Goal 8",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2007-06-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2007-12-17T11:01:23.460Z",
    "isActive" : false
}
,{
    "goalName" : "Goal 9",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2009-04-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2009-10-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal 10",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2011-07-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2011-12-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal 11",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2010-01-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2010-04-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal 12",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2011-11-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2011-03-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal 13",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2012-12-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2012-11-17T11:01:23.460Z",
    "isActive" : false
},
{
    "goalName" : "Goal 14",
    "goalDesc" : "goal Desc",
    "isTodo" : false,
    "isFav" : false,
    "latitude" : "-33.7061491",
    "longitude" : "150.90369529999998",
    "taskProgress" : 100,
    "created" : "2012-10-17T11:01:00.000Z",
    "created_by" : "55094a4233ae68a301aef6eb",
    "goal_completed" : "2013-11-17T11:01:23.460Z",
    "isActive" : false
}

  );
});

