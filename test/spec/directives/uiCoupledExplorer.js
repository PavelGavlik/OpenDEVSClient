'use strict';

describe('Directive: uiCoupledExplorer', function() {
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
	});
});

describe('Service: computeCouplingSegments', function () {
	var service;

	beforeEach(module('clientApp'));

	beforeEach(inject(function(computeCouplingSegments) {
		service = computeCouplingSegments;
	}));

	it('should return line for two vertices', function() {
		var vertices = [{x:341, y:79}, {x:502, y:79}];
		expect(service(vertices)).toBe('M 341 79 L 502 79');
	});

	it('should return bezier curve for more vertices', function() {
		var vertices = [{x:59, y:79}, {x:162, y:111}, {x:231, y:94}];
		expect(service(vertices)).toBe('M 59 79 L 128 100 Q 162 111 197 103 L 231 94');
	});
});
