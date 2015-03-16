'use strict';

angular.module('serveMeApp')
  .directive('mainModal', function () {
    return {
      templateUrl: 'app/mainModal/mainModal.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });