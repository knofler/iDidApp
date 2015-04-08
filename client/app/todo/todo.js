'use strict';

angular.module('serveMeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todo', {
        url: '/todo',
        templateUrl: 'app/todo/todo.html',
        controller: 'TodoCtrl'
      });
  });