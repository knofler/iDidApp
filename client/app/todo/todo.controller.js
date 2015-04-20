// 'use strict';

angular.module('serveMeApp')
  .controller('TodoCtrl', function ($scope,main,$http, socket, $location, $anchorScroll,Auth,$filter) {
    
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
   $scope.offColor     = "success";

   //Enable google custom search element
   $scope.googleSearch = main.googleSearch;
   $scope.googleSearch();

   //get user info
   $scope.getCurrentUser = Auth.getCurrentUser;


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

  $scope.addGoals    = function (){
    // console.log($scope.goalformdata)
    if($scope.goalformdata == undefined){
      $("#errMsgs").text("You haven't put any goal");
      // console.log("You haven't put any goal");
    }
    else if($scope.goalformdata.goalName == undefined){
      $("#errMsgs").text("You haven't named your goal !!");
      // console.log("You haven't named your goal !!");
    }
    else if($scope.goalformdata.goalDesc == undefined){
      $("#errMsgs").text("Write something about your goal");
      // console.log("Write something about your goal")
    }
    else{
        var descLength = $scope.goalformdata.goalDesc.length
        // console.log(descLength)
        if(descLength >160){
          $("#errMsgs").text("You have typed "+ (descLength-160) + " more letters");
          // console.log("You have typed "+ (descLength-160) + " more letters")
        }else{
            $("#errMsgs").hide();
             $("#errMsgs").text();
              $http.post('/api/goals', { 
              goalName: $scope.goalformdata.goalName,
              goalDesc: $scope.goalformdata.goalDesc,
              isTodo:true,
              isFav:false,
              latitude:$scope.getLatitude,
              longitude:$scope.getLongitude,
              taskProgress: 5,
              created: $filter('date')(new Date(),'short'),
              created_by:$scope.getCurrentUser()._id  
            });
            $scope.goalformdata = {}; 
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
         taskProgress: 100,
         goal_completed: new Date()
      })
      socket.socket.emit('idid',"Emit idid Job");
      }
  $scope.makeFav     = function (goalId){
   $http.put('/api/goals/'+goalId,{
       isFav:true
    })
   };    
  $scope.toggleMap   = function (id){
    // console.log("#"+id)
    $("#map-"+id).delay(200).fadeToggle("slow");
   };
  $scope.showUpload  = function (goalId){
    // console.log("Upload clicked: ",'#fileUpload-'+goalId);
    $('#fileUpload-'+goalId).hide();
    $('#fileSubmit-'+goalId).show();
    // $('.fileSubmit').show();
   }; 
  $scope.remove      = function (id){
    $http.delete('/api/goals/'+id).success(function(goal){
      console.log(goal);
    });
   }; 

  //send email using nodemailer
  $scope.sendMail     = function (){
   
    setTimeout(function(){
       $http.post("/api/emails/", {
        to:$scope.formdata.mailTo,
        from:"nodemailer.me@gmail.com",
        subject:$scope.formdata.mailSubject,
        text:$scope.formdata.mailText,
        created_at:new Date(),
        created_by:$scope.getCurrentUser()._id  
      }).success(function(email){
        console.log(email)
     }); 
        // console.log($scope.formdata.mailTo,"nodemailer.me@gmail.com",$scope.formdata.mailSubject,$scope.formdata.mailText)
    // alert("I have been clicked"); 

    },200);
    };
  $scope.mailModal    = function (){
    $scope.formdata = {};
    document.getElementById('emailModal').toggle();
     // $scope.sendMail(to,from,subject,text);
   }; 
  $scope.addTaskItem  = function (goalId){   
    var id = "taskListDiv-"+goalId;
    var dataComing = $scope.taskformdata.task;
    // console.log("dataComing is :",dataComing)
    if(dataComing !==undefined){
      $http.post('/api/tasks/',{
          goal_id : goalId,
          task : dataComing,
          created_at : new Date(),
          created_by:$scope.getCurrentUser()._id  
        }).success(function(){
          $http.get("/api/goals/"+goalId).success(function(data){
            var taskProg = data.taskProgress; 
              if (taskProg <= 90){
                $http.put('/api/goals/'+goalId,{
                   taskProgress: taskProg+5
                 }).success(function(){
                  $("#"+id).show()
                 })
              }
          }); 
        });
      }
    $scope.taskformdata = {}
    };
  $scope.showTask     = function (goalId){
    $scope.taskdata = '';
    $http.get('/api/tasks/goals/'+goalId).success(function(data){
        // console.log("task for this id is :", data);
        $scope.taskdata = data;
        socket.syncUpdates('task', $scope.taskdata);
    })
    var id = "taskListDiv-"+goalId
    // console.log("id made is :", id)
    $('.taskListClass').hide()
    $("#"+id).delay(200).fadeToggle("slow")
   };  
  $scope.toggleSearch = function (id){
    $("#search-"+id).delay(200).fadeToggle("slow");
   };   
  $scope.handleImage  = function (e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
   };
  $scope.taskDone     = function (goalId,taskId){
    var id = "taskListDiv-"+goalId;
    // alert("hello I am clicked")
    $http.put('/api/tasks/'+taskId,{
          task_completed : true,
          completed_at : new Date()
        })
    $http.get("/api/goals/"+goalId).success(function(data){
      var taskProg = data.taskProgress; 
        if (taskProg <= 90){
          $http.put('/api/goals/'+goalId,{
             taskProgress: taskProg+10
           }).success(function(){
                $("#"+id).show()
              })
         } 
      }); 
    
   };
  $scope.uploadImage  = function (goalId){
    // console.log("formdata.userPhoto : ",$scope.myFile)
    var fullPath = document.getElementById('upload-'+goalId).value;

    console.log("full path is : ", fullPath)
      if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          var ext  = filename.substring((filename.length-4));
          var date = Date.now()
          filename = filename.substring(1,(filename.length-4));
          filename+=date;
          filename+=ext
        }
   
      }
    }; 
  $scope.toggleImage  = function (goalId) {
    $scope.imageData = '';
    $http.get('/api/uploads/goals/'+goalId).success(function(data){
        // console.log("image data for this id are :", data);
        $scope.imageData = data;
        socket.syncUpdates('upload', $scope.imageData);
    })
     $('.imgBox').hide()
    $("#image-"+goalId).delay(200).fadeToggle("slow");
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

  main.getUserGoals($scope.getCurrentUser()._id);
  
  });

  

