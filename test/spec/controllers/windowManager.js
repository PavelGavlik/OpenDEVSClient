'use strict';

describe('Controller: WindowManager', function() {
	var scope, api, routeParams;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, apiMock) {
		scope = $rootScope;
		scope.safeApply = scope.$apply;
		api = apiMock;
		routeParams = {};

		$controller('WindowManager', {
			$scope: scope,
			api: api,
			routeParams: routeParams
		});
	}));

	it('should empty items after launch', function() {
		expect(scope.items.length).toBe(0);
		expect(scope.currentItemName).toBe('');
	});

	it('should add item with openWindow', function() {
		var win = { path: 'New item' };
		scope.openWindow(win.path, win);
		expect(scope.items.length).toBe(1);
		expect(scope.items[0].path).toBe('New item');
	});

	it('should add item with event request', function() {
		var win = { path: 'New item' };
		scope.$emit('WindowManager:openWindow', win.path, win);
		expect(scope.items.length).toBe(1);
		expect(scope.items[0].path).toBe('New item');
	});

	it('should open only items that are not yet in menu', function() {
		var win = { path: 'New item' };
		scope.openWindow(win.path, win);
		scope.openWindow(win.path, win);
		expect(scope.items.length).toBe(1);
		expect(scope.items[0].path).toBe('New item');
	});

	it('should select newly added item', function() {
		var win = { path: 'New item' };
		scope.openWindow(win.path, win);
		expect(scope.currentItemName).toBe('New item');
	});

	it('should be able to switch to another item with selectWindow', function() {
		var win = { path: 'New item' },
			win2 = { path: 'Another item' };
		scope.openWindow(win.path, win);
		scope.openWindow(win2.path, win2);

		scope.selectWindow(win);
		expect(scope.currentItemName).toBe(win.path);
	});

	it('should be able to switch to another item with event request', function() {
		var win = { path: 'New item' },
			win2 = { path: 'Another item' };
		scope.openWindow(win.path, win);
		scope.openWindow(win2.path, win2);

		scope.$emit('WindowManager:selectWindow', win);
		expect(scope.currentItemName).toBe(win.path);
	});

	xit('should be able to close items');
});
