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

		$controller('uiCoupledExplorer', {
			$element: angular.element('<div />'),
			$scope: $scope,
			$window: $window,
			api: api
		});
		spyOn($window, 'prompt').andReturn('name');
		spyOn(api.MyRepositoryItem.prototype, 'post').andReturn(allPromise);
		spyOn(api.MyRepositoryItem.prototype, 'origPost').andReturn(allPromise);
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

	xit('should be able to add atomic', function() {
		expect($scope.model.components.length).toBe(0);
		$scope.addAtomic();
		expect($scope.model.components.length).toBe(1);
		expect($scope.model.components[0].name).toBe('name');
		expect(api.MyRepositoryItem.prototype.origPost).toHaveBeenCalled();
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

describe('Service: computeSubmodelSize', function () {
	var service, svgRoot;

	beforeEach(module('clientApp'));

	beforeEach(inject(function(computeSubmodelSize) {
		service = computeSubmodelSize;
		svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		document.body.appendChild(svgRoot);
	}));

	afterEach(function() {
		document.body.innerHTML = '';
	});

	function tolerance(input, expected, tolerance) {
		return Math.abs(input - expected) <= tolerance;
	}

	it('should compute size for submodel with ports have bigger size than name', function() {
		var size = service(svgRoot, {
			name: 'experimental frame',
			inputPorts: [{name: 'state'}, {name: 'endOfEpisode'}],
			outputPorts: [{name: 'startNewEpisode'}]
		});
		expect(tolerance(size.x, 220, 10)).toBe(true);
		expect(tolerance(size.y, 50, 10)).toBe(true);
	});

	it('should compute size for submodel where ports have smaller size than name', function() {
		var size = service(svgRoot, {
			name: 'generator',
			inputPorts: [],
			outputPorts: [{name: 'out'}]
		});
		expect(tolerance(size.x, 72, 10)).toBe(true);
		expect(tolerance(size.y, 35, 10)).toBe(true);
	});
});
