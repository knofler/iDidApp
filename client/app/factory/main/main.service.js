'use strict';

angular.module('serveMeApp')
   .factory('main',function ($rootScope,$http,socket,$modal,Auth,$timeout,$log){
    
    //Array holders  
    $rootScope.userGoalArr = "";
    
    //get user info
    $rootScope.getCurrentUser = Auth.getCurrentUser;  

    //Class Methods
    $rootScope.getUserGoals   = function (userid){
      //get current todo task views
      $http.get('/api/goals/name/'+userid).success(function(goals) {
          $rootScope.userGoalArr = goals;
          socket.syncUpdates('goal', $rootScope.userGoalArr);
        });
     };

    return {
          getUserGoals   : $rootScope.getUserGoals
          
    }

  })