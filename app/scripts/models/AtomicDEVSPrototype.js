'use strict';

/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 * @extends {App.model.BaseDEVS}
 */
App.model.AtomicDEVSPrototype = function(data, parent) {
	App.model.BaseDEVS.call(this);

	/**
	 * Contains all slots
	 * @type {Array<App.model.Slot>}
	 */
	this.slots = [];

	/**
	 * Contains all delegates
	 * @type {Array<App.model.Delegate>}
	 */
	this.delegates = [];

	/**
	 * Contains all methods
	 * @type {Array<App.model.Method>}
	 */
	this.methods = [];

	/**
	 * Object type (used in controllers)
	 * @type {string}
	 */
	this.type = 'atomic';

	if (parent)
		this.parent = parent;
	this.load(data);
};
Util.inherits(App.model.AtomicDEVSPrototype, App.model.BaseDEVS);

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.AtomicDEVSPrototype.prototype.load = function(data) {
	App.model.BaseDEVS.prototype.load.call(this, data);
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
