'use strict';

describe('Directive: uiRunBlock', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should be stopped at injection', function() {
		element = angular.element('<ui-run-block></ui-run-block>');
		element = $compile(element)($scope);
		$scope.$digest();
		expect(element.find('button')[1].style.display).toBe('none');
	});
});
