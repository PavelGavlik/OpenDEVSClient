'use strict';

/**
 * Common parent of CoupledDEVSPrototype and AtomicDEVSPrototype
 * @constructor
 */
App.model.BaseDEVS = function() {
};

/**
 * Parent object of this item
 * @type {App.model.DEVSRootSolverRT|App.model.BaseDEVS}
 */
App.model.BaseDEVS.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.BaseDEVS.prototype.path = '/';

/**
 * DEVS name
 * @type {string}
 */
App.model.BaseDEVS.prototype.name = '';

/**
 * Contains all input ports
 * @type {Array<App.model.Port>}
 */
App.model.BaseDEVS.prototype.inputPorts = [];

/**
 * Contains all output ports
 * @type {Array<App.model.Port>}
 */
App.model.BaseDEVS.prototype.outputPorts = [];

/**
 * @return {App.model.DEVSRootSolverRT}
 */
App.model.BaseDEVS.prototype.rootSolver = function() {
	if (this instanceof App.model.DEVSRootSolverRT)
		return this;
	else
		return this.parent.rootSolver();
};

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.BaseDEVS.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
	if (this.inputPorts)
		this.inputPorts = this.inputPorts.map(function(port) {
			return new App.model.InputPort(port, this);
		}, this);
	if (this.outputPorts)
		this.outputPorts = this.outputPorts.map(function(port) {
			return new App.model.OutputPort(port, this);
		}, this);
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.BaseDEVS.prototype.getPath = App.model.MyRepository.prototype.getPath;

/**
 * Factory method that adds an input port with given name
 * @param {String} portName
 * @returns {App.model.InputPort}
 */
App.model.BaseDEVS.prototype.addInputPort = function(portName) {
	var port = new App.model.InputPort({ name: portName }, this);
	this.inputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an output port with given name
 * @param {String} portName
 * @returns {App.model.OutputPort}
 */
App.model.BaseDEVS.prototype.addOutputPort = function(portName) {
	var port = new App.model.OutputPort({ name: portName }, this);
	this.outputPorts.push(port);
	return port;
};

/**
 * Remove given port
 * @param {App.model.Port} port
 */
App.model.BaseDEVS.prototype.deletePort = function(port) {
	Util.removeArrayItem(this.inputPorts, port);
	Util.removeArrayItem(this.outputPorts, port);
};
