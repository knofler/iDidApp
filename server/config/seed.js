/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Goal = require('../api/goal/goal.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Goal.find({}).remove(function() {
  Goal.create({
    goalName : 'Learn Data science',
    goalDesc : 'Data science will help me to know more about data pattern',
    userLocation:'sydney',
    isFav:'no',
    contact:'0412649744',
    taskProgress:25,
    created_by:'rumman',
    created: '1416355200'
  }, {
    goalName : 'Go to space',
    goalDesc : 'space is the final frontier',
    userLocation:'brisbane',
    isFav:'yes',
    contact:'0402506607',
    taskProgress:75,
    created_by:'lia',
    created: '1416355910'
  }, {
    goalName : 'Play tennis',
    goalDesc : 'get body fit',
    userLocation:'Melbourne',
    isFav:'yes',
    contact:'0433568974',
    taskProgress:25,
    created_by:'ruhan',
    created: "1416355000"
  }, {
    goalName : 'Build swimming pool',
    goalDesc : 'Get a swimming pool for backyard',
    userLocation:'Perth',
    isFav:'Yes',
    contact:'0412649744',
    taskProgress:55,
    created_by:'rumman',
    created: "1416355200"
  } 
  );
});

