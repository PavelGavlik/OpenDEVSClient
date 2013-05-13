'use strict';

describe('Controller: uiRunBlock', function() {
	var $scope, api;

	beforeEach(module('clientApp'));

	beforeEach(inject(['$controller', '$rootScope', 'api', function($controller, $rootScope, a) {
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

		spyOn(api.DEVSRootSolverRT.prototype, 'changeRunningState').andReturn(allPromise);
		spyOn(api.DEVSRootSolverRT.prototype, 'resetSimulation').andReturn(allPromise);
	}]));

	it('should be able to start simulation', function () {
		$scope.start();
		expect(api.DEVSRootSolverRT.prototype.changeRunningState).toHaveBeenCalled();
	});

	it('should be able to stop simulation', function () {
		$scope.stop();
		expect(api.DEVSRootSolverRT.prototype.changeRunningState).toHaveBeenCalled();
	});

	it('should be able to reset simulation', function () {
		$scope.reset();
		expect(api.DEVSRootSolverRT.prototype.resetSimulation).toHaveBeenCalled();
	});
});

describe('Directive: uiRunBlock', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiRunBlock.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
		$scope.data = new App.model.DEVSRootSolverRT({
			type: 'simulation', running: true,
			rtFactor: 0, time: 20,
			timeLast: 2, timeNext: 3,
			components: [
				{name: 'comp', type: 'coupled'}
			]});
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
