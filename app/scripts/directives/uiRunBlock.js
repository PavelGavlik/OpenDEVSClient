'use strict';

/** @extends {Scope} */
App.type.uiRunBlockScope = {
	loading: false,
	/** @type {App.model.AtomicDEVSPrototype} */
	model: null,
	/** @type {App.model.DEVSRootSolverRT} */
	solver: null,
	/** @type {function} */
	start: null,
	/** @type {function} */
	stop: null,
	/** @type {function} */
	reset: null
};

/**
 * 
 * @param {App.type.uiRunBlockScope} $scope
 * @param {Window} $window
 * @param {App.service.api} api
 */
App.controller.uiRunBlock = function($scope, $window, api) {
	function changeRunningState(willBeRunning) {
		$scope.loading = true;
		var solverResource = new api.DEVSRootSolverRT($scope.solver);
		solverResource.changeRunningState(willBeRunning).success(function() {
			$scope.loading = false;
			$scope.solver.running = willBeRunning;
		}).error(function() {
			$window.alert('Unable to change simulation running state.');
			$scope.loading = false;
		});
	}

	function resetSimulation() {
		$scope.loading = true;
		var solverResource = new api.DEVSRootSolverRT($scope.solver);
		solverResource.resetSimulation().success(function() {
			$scope.loading = false;
			$scope.solver.running = false;
		}).error(function() {
			$window.alert('Unable to reset simulation.');
			$scope.loading = false;
		});
	}

	$scope.solver = $scope.model.rootSolver();
	$scope.start = changeRunningState.bind(null, true);
	$scope.stop = changeRunningState.bind(null, false);
	$scope.reset = resetSimulation;
};

App.directive.uiRunBlock = function() {
	return {
		controller: App.controller.uiRunBlock,
		scope: {model: '=ngModel'},
		templateUrl: 'templates/directives/uiRunBlock.html'
	};
};
