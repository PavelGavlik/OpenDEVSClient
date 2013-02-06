'use strict';

describe('Directive: uiTree', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	beforeEach(function() {
		element = angular.element('<ui-tree model="tree"></ui-tree>');
		$compile(element)($scope);
		$scope.tree = [{name: 'aa'}, {name: 'bb'}];
		$scope.$digest();
	});

	xit('should pass events to tree children');
});
