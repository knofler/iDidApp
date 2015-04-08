'use strict';

angular.module('serveMeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('idid', {
        url: '/idid',
        templateUrl: 'app/idid/idid.html',
        controller: 'IdidCtrl'
      });
  });