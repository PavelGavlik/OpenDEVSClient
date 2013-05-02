'use strict';

App.service.api = function($http, $location) {
	var host = 'http://'+ $location.host() +':9004';

	$http.patch = function(url, data) {
		return $http({
			method: 'PATCH',
			url: url,
			data: data
		});
	};

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
		return $http.post(this.path, this);
	};
	Resource.prototype.patch = function(data) {
		return $http.patch(this.path, data);
	};
	Resource.prototype.delete = function() {
		return $http.delete(this.path);
	};


	/**
	 * @param item
	 * @extends {Resource}
	 */
	function MyRepositoryItemResource(item) {
		angular.extend(this, item);
		this.path = host + item.path;
	}
	Util.inherits(MyRepositoryItemResource, Resource);

	MyRepositoryItemResource.prototype.post = function() {
		var path = host + this.parent.path + this.resourcePath;
		delete this.parent; // cannot serialize circular dependency
		return $http.post(path, this);
	};
	/**
	 * @param {String} newName
	 */
	MyRepositoryItemResource.prototype.rename = function(newName) {
		return $http.patch(this.path, {name: newName});
	};


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
		return this.patch({running: willBeRunning});
	};
	DEVSRootSolverRTResource.prototype.resetSimulation = function() {
		return this.patch({reset: true});
	};


	/**
	 * @param {App.model.InputPort} port
	 * @constructor
	 * @extends {MyRepositoryItemResource}
	 */
	function InputPortResource(port) {
		MyRepositoryItemResource.call(this, port);
	}
	Util.inherits(InputPortResource, MyRepositoryItemResource);


	/**
	 * @param {App.model.OutputPort} port
	 * @constructor
	 * @extends {MyRepositoryItemResource}
	 */
	function OutputPortResource(port) {
		MyRepositoryItemResource.call(this, port);
	}
	Util.inherits(OutputPortResource, MyRepositoryItemResource);


	/**
	 * @param {App.model.Slot} slot
	 * @constructor
	 * @extends {MyRepositoryItemResource}
	 */
	function SlotResource(slot) {
		MyRepositoryItemResource.call(this, slot);
	}
	Util.inherits(SlotResource, MyRepositoryItemResource);

	/**
	 * @param {String} value
	 */
	SlotResource.prototype.injectValue = function(value) {
		return this.patch({value: value});
	};


	/**
	 * @param {App.model.Delegate} delegate
	 * @constructor
	 * @extends {MyRepositoryItemResource}
	 */
	function DelegateResource(delegate) {
		MyRepositoryItemResource.call(this, delegate);
	}
	Util.inherits(DelegateResource, MyRepositoryItemResource);


	return {
		_resource: Resource,
		DEVSRootSolverRT: DEVSRootSolverRTResource,
		MyRepository: MyRepositoryItemResource,
		InputPort: InputPortResource,
		OutputPort: OutputPortResource,
		Slot: SlotResource,
		Delegate: DelegateResource
	};
};
