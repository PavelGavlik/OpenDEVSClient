'use strict';

describe('Directive: uiTree', function() {
  var element, scope;

  beforeEach(module('clientApp'));

  beforeEach(inject(function($rootScope, $compile) {
	scope = $rootScope;
    element = angular.element('<ui-tree model="tree"></ui-tree>');
    $compile(element)(scope);
	scope.tree = [{name: 'aa'}, {name: 'bb'}];
    scope.$digest();
  }));

  xit('should pass events to tree children');
});
