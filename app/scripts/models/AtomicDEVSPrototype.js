'use strict';

/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 * @extends {App.model.BaseDEVS}
 */
App.model.AtomicDEVSPrototype = function(data, parent) {
	if (parent)
		this.parent = parent;
	this.load(data);
};
Util.inherits(App.model.AtomicDEVSPrototype, App.model.BaseDEVS);

/**
 * Contains all input ports
 * @type {Array<App.model.Port>}
 */
App.model.AtomicDEVSPrototype.prototype.inputPorts = [];

/**
 * Contains all output ports
 * @type {Array<App.model.Port>}
 */
App.model.AtomicDEVSPrototype.prototype.outputPorts = [];

/**
 * Contains all slots
 * @type {Array<App.model.Slot>}
 */
App.model.AtomicDEVSPrototype.prototype.slots = [];

/**
 * Contains all delegates
 * @type {Array<App.model.Delegate>}
 */
App.model.AtomicDEVSPrototype.prototype.delegates = [];

/**
 * Contains all methods
 * @type {Array<App.model.Method>}
 */
App.model.AtomicDEVSPrototype.prototype.methods = [];

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.AtomicDEVSPrototype.prototype.load = function(data) {
	App.model.BaseDEVS.prototype.load.call(this, data);
	if (this.inputPorts)
		this.inputPorts = this.inputPorts.map(function(port) {
			return new App.model.InputPort(port, this);
		}, this);
	if (this.outputPorts)
		this.outputPorts = this.outputPorts.map(function(port) {
			return new App.model.OutputPort(port, this);
		}, this);
	if (this.slots)
		this.slots = this.slots.map(function(slot) {
			return new App.model.Slot(slot, this);
		}, this);
	if (this.delegates)
		this.delegates = this.delegates.map(function(delegate) {
			return new App.model.Delegate(delegate, this);
		}, this);
	if (this.methods)
		this.methods = this.methods.map(function(method) {
			return new App.model.Method(method, this);
		}, this);
};

/**
 * Factory method that adds an input port
 * @param {App.model.InputPort} port
 * @returns {App.model.InputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addInputPort = function(port) {
	this.inputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an input port with given name
 * @param {String} portName
 * @returns {App.model.InputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addInputPortWithName = function(portName) {
	return this.addInputPort(new App.model.InputPort({ name: portName }, this));
};

/**
 * Factory method that adds an output port
 * @param {App.model.OutputPort} port
 * @returns {App.model.OutputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addOutputPort = function(port) {
	this.outputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an output port with given name
 * @param {String} portName
 * @returns {App.model.OutputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addOutputPortWithName = function(portName) {
	return this.addOutputPort(new App.model.OutputPort({ name: portName }, this));
};

/**
 * Remove given port
 * @param {App.model.Port} port
 */
App.model.AtomicDEVSPrototype.prototype.deletePort = function(port) {
	Util.removeArrayItem(this.inputPorts, port);
	Util.removeArrayItem(this.outputPorts, port);
};

/**
 * Factory method that adds a slot
 * @param {String} slotName
 */
App.model.AtomicDEVSPrototype.prototype.addSlot = function(slotName) {
	var slot = new App.model.Slot({ name: slotName }, this);
	this.slots.push(slot);
	return slot;
};

/**
 * Remove given slot
 * @param {App.model.Slot} slot
 */
App.model.AtomicDEVSPrototype.prototype.deleteSlot = function(slot) {
	Util.removeArrayItem(this.slots, slot);
};

/**
 * Factory method that adds a delegate
 * @param {String} delegateName
 */
App.model.AtomicDEVSPrototype.prototype.addDelegate = function(delegateName) {
	var delegate = new App.model.Delegate({ name: delegateName }, this);
	this.delegates.push(delegate);
	return delegate;
};

/**
 * Remove given delegate
 * @param {App.model.Delegate} delegate
 */
App.model.AtomicDEVSPrototype.prototype.deleteDelegate = function(delegate) {
	Util.removeArrayItem(this.delegates, delegate);
};

/**
 * Factory method that adds a model method
 * @param {String} methodName
 */
App.model.AtomicDEVSPrototype.prototype.addMethod = function(methodName) {
	var method = new App.model.Method({ name: methodName }, this);
	this.methods.push(method);
	return method;
};

/**
 * Remove given method
 * @param {App.model.Method} method
 */
App.model.AtomicDEVSPrototype.prototype.deleteMethod = function(method) {
	Util.removeArrayItem(this.methods, method);
};
