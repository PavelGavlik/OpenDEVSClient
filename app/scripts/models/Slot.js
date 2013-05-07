'use strict';

/**
 *
 * @param {Object=} data
 * @param {App.model.AtomicDEVSPrototype} parent
 * @constructor
 */
App.model.Slot = function(data, parent) {
	this.resourcePath = 'slots/';
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Slot name
 * @type {string}
 */
App.model.Slot.prototype.name = '';

/**
 * Parent object of this item
 * @type {App.model.BaseDEVS}
 */
App.model.Slot.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.Slot.prototype.path = '/';

/**
 * Slot value
 * @type {string}
 */
App.model.Slot.prototype.value = 'nil';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.Slot.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.Slot.prototype.getPath = App.model.Port.prototype.getPath;
