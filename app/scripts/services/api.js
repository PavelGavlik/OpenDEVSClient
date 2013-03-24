'use strict';

App.service.api = function($http, $location) {
	var host = 'http://'+ $location.host() +':9004';

	/**
	 *
	 * @param {string} path
	 * @constructor
	 */
	function Resource(path) {
		/** @type {string} */
		this.path = host +  path;
	}

	Resource.prototype.get = function() {
		return $http.get(this.path);
	};
	Resource.prototype.post = function() {
		return $http.post(this.path);
	};
	Resource.prototype.put = function(data) {
		return $http.put(this.path, data);
	};
	Resource.prototype.delete = function() {
		return $http.delete(this.path);
	};


	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 */
	function DEVSRootSolverRTResource(solver) {
		this._resource = new Resource(solver.path);
	}

	/**
	 * @param {Boolean} willBeRunning
	 */
	DEVSRootSolverRTResource.prototype.changeRunningState = function(willBeRunning) {
		return this._resource.put({running: willBeRunning});
	};

	DEVSRootSolverRTResource.prototype.resetSimulation = function() {
		return this._resource.put({reset: true});
	};

	return {
		_resource: Resource,
		MyRepository: Resource,
		DEVSRootSolverRT: DEVSRootSolverRTResource
	};
};
