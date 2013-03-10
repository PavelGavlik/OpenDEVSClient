/**
 * MyRepository is a folder which contains named components
 * @constructor
 * @param {Object} data
 */
App.model.MyRepository = function(data) {
	this.load(data);
};

/**
 * Parent object of this item
 * null if this item is root
 * @type {Object}
 */
App.model.MyRepository.prototype.parent = null;

/**
 * Children of this item
 * @type {Array}
 */
App.model.MyRepository.prototype.components = [];

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.MyRepository.prototype.load = function(data) {
	angular.extend(this, data);
	if (!this.components)
		return;

	this.components = this.components.map(function(child) {
		var childObj = null,
			solverObj = null;

		if (child.type === 'MyRepository')
			childObj = new App.model.MyRepository(child);
		else if (child.type === 'simulation') {
			solverObj = new App.model.DEVSRootSolverRT(child);
			solverObj.parent = this;
			childObj = new App.model.CoupledDEVSPrototype(child);
			childObj.parent = solverObj;
			return childObj;
		}
		else
			throw new Error('Unknown child type.');

		childObj.parent = this;
		return childObj;
	}, this);
};


/**
 *
 * @constructor
 * @param {Object} data
 */
App.model.DEVSRootSolverRT = function(data) {
	this.load(data);
};

/**
 * Parent object of this item
 * @type {Object}
 */
App.model.DEVSRootSolverRT.prototype.parent = null;

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.DEVSRootSolverRT.prototype.load = function(data) {
	angular.extend(this, data);
	if (!this.components)
		return;

	this.components = this.components.map(function(child) {
		var childObj = null;
		if (child.type === 'coupled')
			childObj = new App.model.CoupledDEVSPrototype(child);
		else if (child.type === 'atomic')
			childObj = new App.model.AtomicDEVSPrototype(child);
		else
			childObj = new Error('Unknown child type.');

		childObj.parent = this;
		return childObj;
	}, this);
};


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
 * @return {App.model.DEVSRootSolverRT}
 */
App.model.BaseDEVS.prototype.rootSolver = function() {
	if (this.parent.type == 'simulation')
		return this.parent;
	else
		return this.parent.rootSolver();
};

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.BaseDEVS.prototype.load = function(data) {
	angular.extend(this, data);
};


/**
 *
 * @constructor
 * @param {Object} data
 * @extends {App.model.BaseDEVS}
 */
App.model.CoupledDEVSPrototype = function(data) {
	this.load(data);
};
App.inherits(App.model.CoupledDEVSPrototype, App.model.BaseDEVS);

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.CoupledDEVSPrototype.prototype.load = function(data) {
	App.model.BaseDEVS.prototype.load.call(this, data);
	if (!this.components)
		return;

	this.components = this.components.map(function(child) {
		var childObj = null;
		if (child.type === 'coupled')
			childObj = new App.model.CoupledDEVSPrototype(child);
		else if (child.type === 'atomic')
			childObj = new App.model.AtomicDEVSPrototype(child);
		else
			throw new Error('Unknown child type.');

		childObj.parent = this;
		return childObj;
	}, this);
};


/**
 *
 * @constructor
 * @param {Object} data
 * @extends {App.model.BaseDEVS}
 */
App.model.AtomicDEVSPrototype = function(data) {
	this.load(data);
};
App.inherits(App.model.AtomicDEVSPrototype, App.model.BaseDEVS);

///**
// * Rewrite data in object with new data
// * @param {Object} data
// */
//App.model.AtomicDEVSPrototype.prototype.load = function(data) {
//	App.model.BaseDEVS.prototype.load.call(this, data);
//};


/**
 *
 * @constructor
 */
App.model.Port = function() {
};