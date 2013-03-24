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
		this.path = host + path;
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
	 * @param {App.model.Port} port
	 * @extends {Resource}
	 */
	function MyRepositoryItemResource(port) {
		this.path = host + port.path;
	}
	Util.inherits(MyRepositoryItemResource, Resource);


	/**
	 * @param {App.model.DEVSRootSolverRT} solver
	 * @extends {Resource}
	 */
	function DEVSRootSolverRTResource(solver) {
		MyRepositoryItemResource.call(this, solver);
	}
	Util.inherits(DEVSRootSolverRTResource, MyRepositoryItemResource);

	/**
	 * @param {Boolean} willBeRunning
	 */
	DEVSRootSolverRTResource.prototype.changeRunningState = function(willBeRunning) {
		return this.put({running: willBeRunning});
	};
	DEVSRootSolverRTResource.prototype.resetSimulation = function() {
		return this.put({reset: true});
	};


	return {
		_resource: Resource,
		DEVSRootSolverRT: DEVSRootSolverRTResource,
		MyRepository: Resource,
		Port: MyRepositoryItemResource
	};
};
