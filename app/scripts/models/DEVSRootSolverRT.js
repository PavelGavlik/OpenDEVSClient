'use strict';

/**
 *
 * @constructor
 * @extends {App.model.CoupledDEVSPrototype}
 * @param {Object=} data
 * @param {Object=} parent
 */
App.model.DEVSRootSolverRT = function(data, parent) {
	App.model.CoupledDEVSPrototype.call(this);

	/**
	 * Object type (used in controllers)
	 * @type {string}
	 */
	this.type = 'simulation';

	if (parent)
		this.parent = parent;
	if (data)
		this.load(data);
};
Util.inherits(App.model.DEVSRootSolverRT, App.model.CoupledDEVSPrototype);
