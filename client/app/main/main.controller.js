// 'use strict';

angular.module('serveMeApp')
	.controller('MainCtrl', function ($scope,$http,socket,$filter) {

	$scope.goal_create_date 	= ["created"];
	$scope.goal_completed_date  = ["goal_completed"];
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
		 socket.syncUpdates('goal', $scope.ididViews);
	   });
	
	//Socket to update graph on idid action
	socket.socket.on('updateGraph',function(data){
		console.log($scope.goal_create_date)
		console.log($scope.goal_completed_date)
		// By using load() API, you can load data and update the chart dynamically as follows:
		// *****************Generate chart without data********************
		$scope.apiChart.load({
			    columns:[
			    	$scope.goal_create_date,
			    	// ['static', "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12", "2015-04-12"],
				    	['goal',$scope.goal_name],
				    	['data1', 13, 34, 20, 50, 25, 35,34, 20, 50, 25, 35,22,32,12],
				    	['data2', 34, 20, 50, 25, 35,53, 74, 60, 90, 15, 85,45,13,22]
			    	],
			    types:{
					data2:'line' //Add
				}		  
		 });
		});

	//On Page load run
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
		  				// ['data1', 130, 340, 200, 500, 250, 350,340, 200, 500, 250, 350,222,321,123],
				    	['data2', 340, 200, 500, 250, 350,530, 740, 600, 900, 150, 850,456,123,222]
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

  

