'use strict';

/**
 *
 * @param {Object=} data
 * @param {App.model.BaseDEVS} parent
 * @constructor
 */
App.model.Port = function(data, parent) {
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Port name
 * @type {string}
 */
App.model.Port.prototype.name = '';

/**
 * Parent object of this item
 * @type {App.model.BaseDEVS}
 */
App.model.Port.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.Port.prototype.path = '/';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.Port.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.Port.prototype.getPath = function() {
	return this.path = this.parent.getPath() + this.resourcePath + this.name + '/';
};

/**
 * Sets new name for this item
 * @param {String} newName
 */
App.model.Port.prototype.rename = function(newName) {
	this.name = newName;
	this.getPath();
};
