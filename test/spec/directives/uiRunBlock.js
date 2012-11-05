'use strict';

describe('Directive: uiRunBlock', function() {
  beforeEach(module('clientApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<ui-run-block></ui-run-block>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the uiRunBlock directive');
  }));
});
