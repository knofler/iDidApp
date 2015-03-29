// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
  $scope.awesomeThings = [];
  $scope.formdata      = {};
  $scope.taskformdata  = {};
  $scope.myData        = "test data";
   // $scope.isSelected = "goals"         
   // $scope.isActive = true;
   $scope.onText       = "to do";
   $scope.offText      = "iDid";
   $scope.radioOff     = true;
   $scope.label        = "Goals";
   $scope.onColor      = "warning";
   $scope.offColor     = "success"
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
  $scope.addThing    = function () {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
      };
  $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
     };

  $scope.addGoals    = function (){
    if($scope.formdata == undefined){
      $("#errMsg").text("You haven't put any goal");
    }
    else if($scope.formdata.goalName == undefined){
      $("#errMsg").text("You haven't named your goal !!");
    }
    else if($scope.formdata.goalDesc == undefined){
      $("#errMsg").text("Write something about your goal");
    }
    else{
        var descLength = $scope.formdata.goalDesc.length
        // console.log(descLength)
        if(descLength >160){
          $("#errMsg").text("You have typed "+ (descLength-160) + " more letters");
        }else{
            $("#errMsg").hide();
             $("#errMsg").text();
              $http.post('/api/goals', { 
              goalName: $scope.formdata.goalName,
              goalDesc: $scope.formdata.goalDesc,
              isTodo:true,
              isFav:false,
              latitude:$scope.getLatitude,
              longitude:$scope.getLongitude,
              taskProgress: 5,
              created: new Date()  
            });
            $scope.formdata = {}; 
          }
      }
     };
  $scope.iDid        = function (goalId){
      $http.put('/api/goals/'+goalId,{
         isTodo:false,
         isFav:false,
         isActive : false,
         onText  : "todo",
         offText : "iDid",
         taskProgress: 100  
      })
      }
  $scope.makeFav     = function (goalId){
   $http.put('/api/goals/'+goalId,{
       isFav:true
    })
   };    
  $scope.hideMap     = function (id){
    console.log("#"+id)
    $("#"+id).toggle();
   };
  $scope.showUpload  = function (){
    console.log("Upload clicked");
    $('.fileUpload').hide();
    $('.fileSubmit').show();
   }; 
  $scope.remove      = function (id){
    $http.delete('/api/goals/'+id).success(function(goal){
      console.log(goal);
    });
   }; 

  //send email using nodemailer
  $scope.sendMail    = function (){
   
    setTimeout(function(){
       $http.post("/api/emails/", {
        to:$scope.formdata.mailTo,
        from:"nodemailer.me@gmail.com",
        subject:$scope.formdata.mailSubject,
        text:$scope.formdata.mailText
      }).success(function(email){
        console.log(email)
     }); 
        // console.log($scope.formdata.mailTo,"nodemailer.me@gmail.com",$scope.formdata.mailSubject,$scope.formdata.mailText)
    // alert("I have been clicked"); 

    },200);
    };
  $scope.mailModal   = function(){
    $scope.formdata = {};
    document.getElementById('emailModal').toggle();
     // $scope.sendMail(to,from,subject,text);
   }; 
  
  // $scope.taskModal   = function(){
  //   $scope.taskformdata = {};
  //   document.getElementById('taskModal').toggle();
  //    // $scope.sendMail(to,from,subject,text);
  //  }; 
  $scope.addTaskItem  = function (goalId){   
    var dataComing = $scope.taskformdata.task;
    $http.get('/api/goals/'+goalId).success(function(data){
      if (data.taskItem !== undefined){
        var taskItem = [];
        taskItem.push(data.taskItem)
        // console.log("data from form is : ",dataComing)
        // console.log("Current task : ", taskItem)
        taskItem.push(dataComing)
        // console.log("new task " , taskItem);
           $http.put('/api/goals/'+goalId,{
             taskItem:taskItem
            })
      }else{
        // console.log("I dont have past data")
         $http.put('/api/goals/'+goalId,{
             taskItem:dataComing
            })
      }
    });
   
    $scope.taskformdata = {}
    };



  // scroll to feature included for SPA App
  $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
      };

  // Collect User Geo Location using geo-location element    
  $scope.getLatitude  = '';
  $scope.getLongitude = '';
  
  $scope.loc = document.querySelector('geo-location');
  $scope.loc.addEventListener('geo-response', function(e) {
    $scope.getLatitude  = this.latitude;
    $scope.getLongitude = this.longitude;
    console.log('lat:' + $scope.getLatitude,'lng:' + $scope.getLongitude);
   });   

 
  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  

