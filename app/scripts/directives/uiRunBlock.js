'use strict';

/** @extends {Scope} */
App.type.uiRunBlockScope = {
	loading: false,
	/** @type {App.model.AtomicDEVSPrototype} */
	model: null,
	solverResource: null,
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
 * @param {App.service.api} api
 */
App.controller.uiRunBlock = function($scope, $window, api) {
	function changeRunningState(willBeRunning) {
		$scope.loading = true;
		$scope.solverResource.changeRunningState(willBeRunning).success(function() {
			$scope.loading = false;
			$scope.model.running = willBeRunning;
		}).error(function() {
			$window.alert('Unable to change simulation running state.');
			$scope.loading = false;
		});
	}

	function resetSimulation() {
		$scope.loading = true;
		$scope.solverResource.resetSimulation().success(function() {
			$scope.loading = false;
			$scope.model.running = false;
		}).error(function() {
			$window.alert('Unable to reset simulation.');
			$scope.loading = false;
		});
	}

	$scope.solverResource = new api.DEVSRootSolverRT($scope.model.rootSolver());
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
