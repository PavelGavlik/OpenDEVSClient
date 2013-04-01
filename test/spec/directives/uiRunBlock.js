'use strict';

describe('Controller: uiRunBlock', function() {
	var $scope, api;

	// load the controller's module
	beforeEach(module('clientApp'));

	// initialize the controller and a mock scope
	beforeEach(inject(['$controller', '$rootScope', '$q', 'api', function($controller, $rootScope, $q, a) {
		$scope = $rootScope;
		$scope.model = new App.model.DEVSRootSolverRT({components: [
			{name: 'comp', type: 'coupled'}
		]});
		api = a;

		$controller('uiRunBlock', {
			$scope: $scope,
			$window: $window,
			api: api
		});
	}]));

	it("should be able to start simulation", function () {
		spyOn($scope.solverResource, 'changeRunningState').andReturn(allPromise);
		$scope.start();
		expect($scope.solverResource.changeRunningState).toHaveBeenCalled();
	});

	it("should be able to stop simulation", function () {
		spyOn($scope.solverResource, 'changeRunningState').andReturn(allPromise);
		$scope.stop();
		expect($scope.solverResource.changeRunningState).toHaveBeenCalled();
	});

	it("should be able to reset simulation", function () {
		spyOn($scope.solverResource, 'resetSimulation').andReturn(allPromise);
		$scope.reset();
		expect($scope.solverResource.resetSimulation).toHaveBeenCalled();
	});
});

describe('Directive: uiRunBlock', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiRunBlock.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
		$scope.data = {
			type: 'simulation', running: true,
			rtFactor: 0, time: 20,
			timeLast: 2, timeNext: 3,
			rootSolver: function() { return this; }
		};
	}]));

	function build() {
		element = angular.element('<div ui-run-block ng-model="data" />');
		element = $compile(element)($scope);
		$scope.$digest();
	}

	it('should show timeLast and timeNext', function() {
		build();
		expect(element.find('span')[1].innerHTML).toBe('2');
		expect(element.find('span')[2].innerHTML).toBe('3');
	});

	it('should show time and RT factor for simulations', function() {
		build();
		expect(element.find('span')[0].innerHTML).toBe('20');
		expect(element.find('span')[3].innerHTML).toBe('0');
	})

	it('should show stop button when running', function() {
		build();
		expect(element.find('button')[0].style.display).toBe('none');
	});
});
