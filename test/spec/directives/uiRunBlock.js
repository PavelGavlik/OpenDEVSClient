'use strict';

describe('Directive: uiRunBlock', function() {
  beforeEach(module('clientApp'));

  var element;

  it('should be stopped at injection', inject(function($rootScope, $compile) {
    element = angular.element('<ui-run-block></ui-run-block>');
    element = $compile(element)($rootScope);
    expect($rootScope.state).toBe('stopped');
  }));
});
