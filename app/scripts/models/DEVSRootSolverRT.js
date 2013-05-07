'use strict';

/**
 *
 * @constructor
 * @extends {App.model.CoupledDEVSPrototype}
 * @param {Object=} data
 * @param {Object=} parent
 */
App.model.DEVSRootSolverRT = function(data, parent) {
	if (parent)
		this.parent = parent;
	if (data)
		this.load(data);
};
Util.inherits(App.model.DEVSRootSolverRT, App.model.CoupledDEVSPrototype);

/**
 * Parent object of this item
 * @type {Object}
 */
App.model.DEVSRootSolverRT.prototype.parent = null;

/**
 * Solver name
 * @type {string}
 */
App.model.DEVSRootSolverRT.prototype.name = '';

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.DEVSRootSolverRT.prototype.getPath = App.model.MyRepository.prototype.getPath;
