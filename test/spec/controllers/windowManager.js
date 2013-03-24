'use strict';

describe('Controller: WindowManager', function() {
	var $scope;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		$scope = $rootScope;
		$scope.safeApply = $scope.$apply;

		$controller('WindowManager', {
			$scope: $scope
		});
	}));

	it('should empty windows after launch', function() {
		expect($scope.windows.length).toBe(0);
		expect($scope.currentWindowName).toBe('');
	});

	it('should add window with openWindow', function() {
		var win = { path: 'New window' };
		$scope.openWindow(win.path, win);
		expect($scope.windows.length).toBe(1);
		expect($scope.windows[0].path).toBe('New window');
	});

	it('should add window with event request', function() {
		var win = { path: 'New window' };
		$scope.$emit('WindowManager:openWindow', win.path, win);
		expect($scope.windows.length).toBe(1);
		expect($scope.windows[0].path).toBe('New window');
	});

	it('should open only windows that are not yet in menu', function() {
		var win = { path: 'New window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win.path, win);
		expect($scope.windows.length).toBe(1);
		expect($scope.windows[0].path).toBe('New window');
	});

	it('should select newly added window', function() {
		var win = { path: 'New window' };
		$scope.openWindow(win.path, win);
		expect($scope.currentWindowName).toBe('New window');
	});

	it('should be able to switch to another window with selectWindow', function() {
		var win = { path: 'New window' },
			win2 = { path: 'Another window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win2.path, win2);

		$scope.selectWindow(win);
		expect($scope.currentWindowName).toBe(win.path);
	});

	it('should be able to switch to another window with event request', function() {
		var win = { path: 'New window' },
			win2 = { path: 'Another window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win2.path, win2);

		$scope.$emit('WindowManager:selectWindow', win);
		expect($scope.currentWindowName).toBe(win.path);
	});

	it('should be able to close windows with closeWindow', function() {
		var win = { path: 'New window' },
			win2 = { path: 'Another window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win2.path, win2);

		$scope.closeWindow(win);
		expect($scope.windows.length).toBe(1);
		expect($scope.currentWindowName).toBe(win2.path);
	});

	it('should be able to close windows with event request', function() {
		var win = { path: 'New window' },
			win2 = { path: 'Another window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win2.path, win2);

		$scope.$emit('WindowManager:closeWindow', win);
		expect($scope.windows.length).toBe(1);
		expect($scope.currentWindowName).toBe(win2.path);
	});

	it("should select last window after closing one", function () {
		var win = { path: 'New window' },
			win2 = { path: 'Another window' };
		$scope.openWindow(win.path, win);
		$scope.openWindow(win2.path, win2);

		$scope.closeWindow(win2);
		expect($scope.windows.length).toBe(1);
		expect($scope.currentWindowName).toBe(win.path);
	});
});

describe('Directive: uiWindow', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		$scope.model = { type: 'stub' };
		element = angular.element('<div ui-window ng-model="model" />');
		element = $compile(element)($scope);
		$scope.$digest();
	});
});

describe('Controller: MyRepositoryItem', function() {
	var $scope, api;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(['$controller', '$rootScope', 'api', function($controller, $rootScope, a) {
		$scope = $rootScope;
		api = a;
		var model = $scope.model = new App.model.MyRepository();

		$scope.modelResource = new api.MyRepository('/');
		spyOn($scope.modelResource, 'get').andReturn(allPromise );

		$controller('MyRepositoryItem', {
			$scope: $scope,
			api: api,
			model: model
		});
	}]));

	it("should work", function () {
		expect($scope.modelResource.get).toHaveBeenCalled();
	});
});