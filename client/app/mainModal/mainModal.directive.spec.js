'use strict';

describe('Directive: mainModal', function () {

  // load the directive's module and view
  beforeEach(module('serveMeApp'));
  beforeEach(module('app/mainModal/mainModal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-modal></main-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainModal directive');
  }));
});