'use strict';

describe('Controller: MainCtrl', function() {
	var scope, api, routeParams;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, apiMock) {
		scope = $rootScope.$new();
		api = apiMock;
		routeParams = {}

		$controller('MainCtrl', {
			$scope: scope,
			api: api,
			routeParams: routeParams
		});
	}));

	it('should load items via api', function() {
		expect(api.simulations.success).toHaveBeenCalled();
	});

	it('should empty items after launch', function() {
		expect(scope.items.length).toBe(0);
		expect(scope.currentItemName).toBe('');
	});

	it('should add item with openItem', function() {
		scope.openItem({ name: 'New item' });
		scope.$apply();

		expect(scope.items.length).toBe(1);
		expect(scope.items[0].name).toBe('New item');
	});

	it('should open only items that are not yet in menu', function() {
		scope.openItem({ name: 'New item' });
		scope.openItem({ name: 'New item' });
		scope.$apply();

		expect(scope.items.length).toBe(1);
		expect(scope.items[0].name).toBe('New item');
	});

	it('should select newly added item', function() {
		scope.openItem({ name: 'New itemitem' });
		scope.$apply();

		expect(scope.currentItemName).toBe('New itemitem');
	});

	it('should be able to switch to another item', function() {
		var item = { name: 'Another item' };
		scope.openItem(item);
		scope.openItem({ name: 'New item' });
		scope.$apply();

		scope.selectItem(item);
		expect(scope.currentItemName).toBe(item.name);
	});

	xit('should be able to close items');
});
