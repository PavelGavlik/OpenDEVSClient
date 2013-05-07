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
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.BaseDEVS.prototype.getPath = App.model.MyRepository.prototype.getPath;
