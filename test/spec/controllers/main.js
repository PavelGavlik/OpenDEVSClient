'use strict';

describe('Controller: Main', function() {
	var scope;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope;
		$controller('Main', {
			$scope: scope
		});
	}));
});
