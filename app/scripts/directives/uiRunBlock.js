'use strict';

/** @extends {Scope} */
App.type.uiRunBlockScope = {
	loading: false,
	/** @type {App.model.AtomicDEVSPrototype} */
	model: null,
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
App.controller.uiRunBlock = function($scope, api) {
	function changeRunningState(willBeRunning) {
		$scope.loading = true;
		api.DEVSRootSolverRT.changeRunningState($scope.model.rootSolver(), willBeRunning).success(function() {
			$scope.loading = false;
			$scope.model.running = willBeRunning;
		}).error(function() {
			alert('Unable to change simulation running state.');
			$scope.loading = false;
		});
	}

	function resetSimulation() {
		$scope.loading = true;
		api.DEVSRootSolverRT.resetSimulation($scope.model.rootSolver()).success(function() {
			$scope.loading = false;
			$scope.model.running = false;
		}).error(function() {
			alert('Unable to reset simulation.');
			$scope.loading = false;
		});
	}

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
