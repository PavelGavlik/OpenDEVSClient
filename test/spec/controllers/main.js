'use strict';

describe('Controller: MainCtrl', function() {
	var scope;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, apiMock) {
		scope = $rootScope.$new();
		$controller('MainCtrl', {
			$scope: scope,
			api: apiMock
		});
	}));

	xit('should load items via api');

	it('should empty items after launch', function() {
		expect(scope.items.length).toBe(0);
		expect(scope.currentItem).toBe(-1);
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

		expect(scope.currentItem).toBe(0);
	});

	it('should be able to switch to another item', function() {
		scope.openItem({ name: 'Another item' });
		scope.openItem({ name: 'New item' });
		scope.$apply();

		scope.selectItem(0);
		expect(scope.currentItem).toBe(0);
	});

	xit('should be able to close items');
});
