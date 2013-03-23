'use strict';

App.service.api = function($http, $location) {
	var host = 'http://'+ $location.host() +':9004';
	var api = {
		MyRepository: function(path) {
			return $http.get(host + path);
		},
		DEVSRootSolverRT: {},
	};
	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 * @param {boolean} willBeRunning
	 */
	api.DEVSRootSolverRT.changeRunningState = function(solver, willBeRunning) {
		return $http.put(host + solver.getPath(), {running: willBeRunning});
	};

	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 */
	api.DEVSRootSolverRT.resetSimulation = function(solver) {
		return $http.put(host + solver.getPath(), {reset: true});
	};
	return api;
};
