'use strict';

describe('Directive: uiRunBlock', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiCoupledExplorer.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		element = angular.element('<div ui-coupled-explorer />');
		element = $compile(element)($scope);
		$scope.$digest();
		// expect(element.find('button')[1].style.display).toBe('none');
	});
});