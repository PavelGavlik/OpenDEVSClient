'use strict';

describe('Controller: uiCoupledExplorer', function() {
	var $scope, api;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(['$controller', '$rootScope', 'api', function($controller, $rootScope, a) {
		$scope = $rootScope;
		api = a;
		$scope.model = new App.model.CoupledDEVSPrototype();

		var element = angular.element('<div />');
		var svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		element[0].appendChild(svgRoot);

		$controller('uiCoupledExplorer', {
			$element: element,
			$scope: $scope,
			$window: $window,
			api: api
		});
		spyOn($window, 'prompt').andReturn('name');
		spyOn(api.MyRepositoryItem.prototype, 'post').andReturn(allPromise);
//		spyOn(api.Port.prototype, 'post'); - same method as MyRepositoryItem
	}]));

	it('should be able to add port', function() {
		expect($scope.model.inputPorts.length).toBe(0);
		$scope.addInputPort();
		expect($scope.model.inputPorts.length).toBe(1);
		expect($scope.model.inputPorts[0].name).toBe('name');
		expect(api.Port.prototype.post).toHaveBeenCalled();

		expect($scope.model.outputPorts.length).toBe(0);
		$scope.addOutputPort();
		expect($scope.model.outputPorts.length).toBe(1);
		expect($scope.model.outputPorts[0].name).toBe('name');
		expect(api.Port.prototype.post).toHaveBeenCalled();
	});

	it('should be able to add atomic', function() {
		expect($scope.model.components.length).toBe(0);
		$scope.addAtomic();
		expect($scope.model.components.length).toBe(1);
		expect($scope.model.components[0].name).toBe('name');
		expect(api.MyRepositoryItem.prototype.post).toHaveBeenCalled();
	});

	it('should be able to add coupled', function() {
		expect($scope.model.components.length).toBe(0);
		$scope.addCoupled();
		expect($scope.model.components.length).toBe(1);
		expect($scope.model.components[0].name).toBe('name');
		expect(api.MyRepositoryItem.prototype.post).toHaveBeenCalled();
	});
});

describe('Directive: uiCoupledExplorer', function() {
	var $element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiCoupledExplorer.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		$element = angular.element('<div ui-coupled-explorer />');
		$element = $compile($element)($scope);
		$scope.$digest();
	});
});
