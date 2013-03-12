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

	it('should show timeLast and timeNext', function() {
		$scope.data = { timeLast: 2, timeNext: 3 };
		build();
		expect(element.find('span')[1].innerHTML).toBe('2');
		expect(element.find('span')[2].innerHTML).toBe('3');
	});

	it('should show time and RT factor for simulations', function() {
		$scope.data = { type: 'simulation', rtFactor: 0, time: 20,
			rootSolver: function() { return this; }
		};
		build();
		expect(element.find('span')[0].innerHTML).toBe('20');
		expect(element.find('span')[3].innerHTML).toBe('0');
	})

	it('should show stop button when running', function() {
		$scope.data = { running: true };
		build();
		expect(element.find('button')[0].style.display).toBe('none');
	});
});
