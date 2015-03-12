// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
  $scope.awesomeThings = [];
  $scope.formData       = {};
   // $scope.isSelected = "goals"         
   // $scope.isActive = true;
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

  // ########## API CALLS and Promises #################

  //get current todo task views
  $http.get('/api/goals').success(function(goals) {
    $scope.views = goals;
    socket.syncUpdates('goal', $scope.views);
    });
  //get completed task view, aka idid views
  $http.get('/api/goals/idid/',{
    params:{
            taskstatus:false
            }
          }).success(function(dids) {
            $scope.ididViews = dids;
            socket.syncUpdates('goal', $scope.ididViews);
     });
   

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

  $scope.addGoals    = function (){
      $http.post('/api/goals', { 
        goalName: $scope.formdata.goalName,
        goalDesc: $scope.formdata.goalDesc,
        isTodo:true,
        isFav:false,
        latitude:$scope.latitude,
        longitude:$scope.longitude,
        taskProgress: 5,
        created: new Date()  
      });
      $scope.formdata = {}; 
     };
  $scope.iDid        = function(goalId){
      $http.put('/api/goals/'+goalId,{
         isTodo:false,
         isFav:false,
         isActive : false,
         onText  : "todo",
         offText : "iDid",
         taskProgress: 100  
      })
      }
    
  // scroll to feature included for SPA App
  $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
      };

  // Collect User Geo Location using geo-location element    
  $scope.latitude  = '';
  $scope.longitude = '';
  
  $scope.loc = document.querySelector('geo-location');
  $scope.loc.addEventListener('geo-response', function(e) {
    $scope.latitude  = this.latitude;
    $scope.longitude = this.longitude;
    console.log('lat:' + $scope.latitude,'lng:' + $scope.longitude);
  });   

 
  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  

