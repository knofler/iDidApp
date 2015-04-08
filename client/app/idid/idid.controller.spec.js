'use strict';

describe('Controller: IdidCtrl', function () {

  // load the controller's module
  beforeEach(module('serveMeApp'));

  var IdidCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IdidCtrl = $controller('IdidCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
