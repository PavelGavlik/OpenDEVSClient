'use strict';

describe('Controller: Main', function() {
	var $scope;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		$scope = $rootScope;
		var model = {at: function() {}};
		$controller('Main', {
			$scope: $scope,
			model: model
		});
	}));

	it("should open Myrepository", inject(function ($timeout) {
		var count = 0;
		$scope.$on('WindowManager:openWindow', function() {
			count++;
		});
		$scope.$emit('WindowManager:ready');
		$timeout.flush();
		expect(count).toBe(1);
	}));
});
