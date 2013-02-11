'use strict';

describe('Directive: uiTree', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		element = angular.element('<div ui-tree model="tree" />');
		$compile(element)($scope);
		$scope.tree = [{name: 'aa'}, {name: 'bb', components: [{name: 'cc'}]}];
		$scope.$digest();
	});
});
