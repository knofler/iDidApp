// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope,$http,socket) {
    
	// By using load() API, you can load data and update the chart dynamically as follows:
	// *****************Generate chart without data********************
	$scope.apiChart = c3.generate({
		bindto:'#apiChart',
		data:{
		   x: 'x',
				   columns: [
		            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
		//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
		            ['data1', 30, 200, 100, 400, 150, 250],
		            ['data2', 130, 340, 200, 500, 250, 350]
		        ]
    		},
			axis: {
			        x: {
			            type: 'timeseries',
			            tick: {
			                format: '%Y-%m-%d'
			            }
			        }
			    }
	 });



// setTimeout(function () {
//     chart.load({
//         columns: [
//             ['data3', 400, 500, 450, 700, 600, 500]
//         ]
//     });
// }, 1000);

	// ************Load Data **************************
	$scope.loadData = function(){
	  $scope.apiChart.load({
		columns: [
	            ['data3', 400, 500, 450, 700, 600, 500]
	        ],
		 types:{
				data2:'line' //Add
			}
	    })
	 };
	

  
  
  });

  

