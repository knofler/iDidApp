// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
    $scope.awesomeThings = [];

  // ########## API CALLS and Promises #################
    $http.get('/api/goals').success(function(goals) {
      $scope.views = goals;
      socket.syncUpdates('goal', $scope.views);
      });

    $scope.formData       = {};
    // $scope.isSelected = "goals"
    
                 
                 $scope.isActive = true;
                 $scope.onText = "todo";
                 $scope.offText = "iDid";
                 $scope.radioOff = true;
                 $scope.label = "goals";
                 $scope.onColor = "warning";
                 $scope.offColor = "success"
                  // switch-on-color="{{ onColor }}"
                  // switch-off-color="{{ offColor }}"
                  // switch-animate="{{ animate }}"
                  // switch-size="{{ size }}"
                  // switch-label="{{ label }}"
                  // switch-icon="{{ icon }}"
                  // switch-radio-off="{{ radioOff }}"
                  // switch-label-width="{{ labelWidth }}"
                  // switch-handle-width="{{ handleWidth }}"
                  // switch-wrapper="{{ wrapper }}"
                  // ng-true-value="'yep'"
                  // ng-false-value="'nope'"
                  // switch-inverse="{{ inverse }}">

    
    // Functions interating with api calls and rendering pages
    $scope.addThing    = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
      };
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
     };

    $scope.addGoals = function (){
      $http.post('/api/goals', { 
        goalName: $scope.formdata.goalName,
        goalDesc: $scope.formdata.goalDesc,
        taskProgress: 25,
        created: new Date()  
      });
      $scope.formdata = {}; 
     };

  // scroll to feature included for SPA App
    $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
     };

  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  

