'use strict';

describe('Directive: ngSvg', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		element = angular.element('<g ng-height="100" />');
		element = $compile(element)($scope);
		$scope.$digest();
	});
});
