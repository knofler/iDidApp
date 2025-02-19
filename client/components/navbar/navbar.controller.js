'use strict';

angular.module('serveMeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {'title': 'Home','link': '/'}
      ];
    $scope.loggedinMenu =[
      {'title': 'toDo','link': '/todo'}
      // {'title': 'iDid','link': '/idid'}
      // {'title': 'React','link':'/react'}
    ];

    $scope.isCollapsed    = true;
    $scope.isLoggedIn     = Auth.isLoggedIn;
    $scope.isAdmin        = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isUser         = Auth.isUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });