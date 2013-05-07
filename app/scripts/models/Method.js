'use strict';

/**
 *
 * @param {Object=} data
 * @param {App.model.AtomicDEVSPrototype} parent
 * @constructor
 */
App.model.Method = function(data, parent) {
	this.resourcePath = 'methods/';
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Method name
 * @type {string}
 */
App.model.Method.prototype.name = '';

/**
 * Parent object of this item
 * @type {App.model.BaseDEVS}
 */
App.model.Method.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.Method.prototype.path = '/';

/**
 * Slot value
 * @type {string}
 */
App.model.Method.prototype.value = 'nil';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.Method.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.Method.prototype.getPath = App.model.Port.prototype.getPath;
