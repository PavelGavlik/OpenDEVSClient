'use strict';

describe('Directive: uiMethodEditor', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		element = angular.element('<div ui-method-editor />');
		element = $compile(element)($scope);
		$scope.$digest();
	});
});
