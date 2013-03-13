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

	it('should update simulations when needed', function() {
		var simulations = {myKey: 'value'};
		scope.pass('simulations')(simulations);
		expect(scope.simulations).toBe(simulations);
	});
});
