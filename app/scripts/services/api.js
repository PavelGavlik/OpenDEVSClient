'use strict';

App.service.api = function($http, $location) {
	var host = 'http://'+ $location.host() +':9004';
	var api = {
		MyRepository: function(path) {
			return $http.get(host + path);
		},
		DEVSRootSolverRT: {}
	};

	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 * @param {boolean} willBeRunning
	 * @returns {*|HttpPromise}
	 */
	api.DEVSRootSolverRT.changeRunningState = function(solver, willBeRunning) {
		return $http.put(host + solver.getPath(), { running: willBeRunning});
	};

	return api;
};