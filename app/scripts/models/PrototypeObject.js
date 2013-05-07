'use strict';

/**
 * Prototype Object
 * @param {Object=} data
 * @param {Object=} parent
 * @constructor
 */
App.model.PrototypeObject = function(data, parent) {
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Parent object of this item
 * @type {App.model.MyRepository}
 */
App.model.PrototypeObject.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.PrototypeObject.prototype.path = '/';

/**
 * Prototype Object name
 * @type {string}
 */
App.model.PrototypeObject.prototype.name = '';

/**
 * Contains all slots
 * @type {Array<App.model.Slot>}
 */
App.model.PrototypeObject.prototype.slots = [];

/**
 * Contains all delegates
 * @type {Array<App.model.Delegate>}
 */
App.model.PrototypeObject.prototype.delegates = [];

/**
 * Contains all methods
 * @type {Array<App.model.Method>}
 */
App.model.PrototypeObject.prototype.methods = [];

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.PrototypeObject.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();

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
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.PrototypeObject.prototype.getPath = App.model.MyRepository.prototype.getPath;

/**
 * Factory method that adds a slot
 * @param {String} slotName
 */
App.model.PrototypeObject.prototype.addSlot = App.model.AtomicDEVSPrototype.prototype.addSlot;

/**
 * Remove given slot
 * @param {App.model.Slot} slot
 */
App.model.PrototypeObject.prototype.deleteSlot = App.model.AtomicDEVSPrototype.prototype.deleteSlot;

/**
 * Factory method that adds a delegate
 * @param {String} delegateName
 */
App.model.PrototypeObject.prototype.addDelegate = App.model.AtomicDEVSPrototype.prototype.addDelegate;

/**
 * Remove given delegate
 * @param {App.model.Delegate} delegate
 */
App.model.PrototypeObject.prototype.deleteDelegate = App.model.AtomicDEVSPrototype.prototype.deleteDelegate;

/**
 * Factory method that adds a model method
 * @param {String} methodName
 */
App.model.PrototypeObject.prototype.addMethod = App.model.AtomicDEVSPrototype.prototype.addMethod;

/**
 * Remove given method
 * @param {App.model.Method} method
 */
App.model.PrototypeObject.prototype.deleteMethod = App.model.AtomicDEVSPrototype.prototype.deleteMethod;
