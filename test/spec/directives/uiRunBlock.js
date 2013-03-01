'use strict';

describe('Directive: uiRunBlock', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiRunBlock.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	function build() {
		element = angular.element('<div ui-run-block ng-model="data" />');
		element = $compile(element)($scope);
		$scope.$digest();
	}

	it('should show start button when stopped', function() {
		$scope.data = { running: false };
		build();
		expect(element.find('button')[1].style.display).toBe('none');
	});

	it('should show stop button when running', function() {
		$scope.data = { running: true };
		build();
		expect(element.find('button')[0].style.display).toBe('none');
	});
});
