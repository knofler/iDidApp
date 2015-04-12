// 'use strict';

angular.module('serveMeApp')
	.controller('MainCtrl', function ($scope,$http,socket,$filter) {

	$scope.goal_create_date 	= ["created"];
	$scope.goal_completed_date  = ["completed"];
	$scope.goal_name 		    = ["goal"];

	//get completed task view, aka idid views
	$http.get('/api/goals/idid/',{
	    params:{
		    taskstatus:false
		    }
		  }).success(function(dids) {
		  	var duration = 0;
		    	$scope.ididViews = dids;
		    	$scope.ididViews.forEach(function(data){
		    		duration = data.goal_completed - data.created
		    	console.log("Goal created: ", $filter('date')(data.created, "yyyy-MM-dd"));
		    	console.log("Goal completed: ", $filter('date')(data.goal_completed,"yyyy-MM-dd"));
		    	$scope.goal_create_date.push($filter('date')(data.created, 'yyyy-MM-dd'));
		    	$scope.goal_completed_date.push($filter('date')(data.goal_completed, 'yyyy-MM-dd'));
		    	// $scope.goal_create_date.push(data.created);
		    	// $scope.goal_completed_date.push(data.completed)
		    	$scope.goal_name.push(data.goalName)
		    	console.log("Goal Name is :",$scope.goal_name);
		    	console.log("duration is : ", duration)
		    })
		 socket.syncUpdates('goal', $scope.goal_create_date);
	   });
	setTimeout(function(){
		console.log($scope.goal_create_date)
		console.log($scope.goal_completed_date)
		// By using load() API, you can load data and update the chart dynamically as follows:
		// *****************Generate chart without data********************
		$scope.apiChart = c3.generate({
			bindto:'#apiChart',
			data:{
				x:'created',
			    columns:[
			    	$scope.goal_create_date,
			    	// ['static', "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12"],
				    	['goal',$scope.goal_name],
				    	['data1', 130, 340, 200, 500, 250, 350],
				    	['data2', 530, 740, 600, 900, 150, 850]
			    	]
			},
			axis: {
				x:{
		        	type: 'timeseries',
		        	tick: {
		            	format: '%Y-%m-%d'
		        	}
		        }
		    }    
		 });
	   },500)

	  // ************Load Data **************************
	$scope.loadData = function(){
	  // alert($scope.goal_create_date)
	  $scope.apiChart.load({
		 columns: [
	        'x',$scope.goal_create_date[2]
	       ],
		 types:{
				data2:'line' //Add
			}	
	    })
	  };
 });

  

