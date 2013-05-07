'use strict';

/**
 *
 * @param {Object=} data
 * @param {App.model.AtomicDEVSPrototype} parent
 * @constructor
 */
App.model.Delegate = function(data, parent) {
	this.resourcePath = 'delegates/';
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Delegate name
 * @type {string}
 */
App.model.Delegate.prototype.name = '';

/**
 * Parent object of this item
 * @type {App.model.BaseDEVS}
 */
App.model.Delegate.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.Delegate.prototype.path = '/';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.Delegate.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.Delegate.prototype.getPath = App.model.Port.prototype.getPath;

/**
 * Sets new name for this item
 * @param {String} newName
 */
App.model.Delegate.prototype.rename = function(newName) {
	this.name = newName;
	this.getPath();
};
