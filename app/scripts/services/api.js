'use strict';

App.service.api = function($http, $location) {
	var host = 'http://'+ $location.host() +':9004';
	var api = {
		simulations: function() {
			return $http.get(host+'/Simulations/');
		}
	};

	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 * @param {boolean} willBeRunning
	 * @returns {*|HttpPromise}
	 */
	api.simulations.changeRunningState = function(solver, willBeRunning) {
		return $http.put(host + solver.path(), { running: willBeRunning});
	};

	return api;
};