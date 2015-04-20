'use strict';

angular.module('serveMeApp')
   .factory('main',function ($rootScope,$http,socket,$modal,Auth,$timeout,$log){
    
    //Array holders  
    $rootScope.userGoalArr = "";
    
    //get user info
    $rootScope.getCurrentUser = Auth.getCurrentUser;  

    //Class Methods
    $rootScope.getUserGoals  = function (userid){
      //get current todo task views
      $http.get('/api/goals/name/'+userid).success(function(goals) {
          $rootScope.userGoalArr = goals;
          socket.syncUpdates('goal', $rootScope.userGoalArr);
        });
     };
    $rootScope.customSearch  = function(){
        var cx = '001493205649956684246:q-k3vn__5kw';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
     }; 

    return {
          getUserGoals   : $rootScope.getUserGoals,
          googleSearch   : $rootScope.customSearch
          
    }

  })
