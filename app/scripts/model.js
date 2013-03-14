/**
 * MyRepository is a folder which contains named components
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 */
App.model.MyRepository = function(data, parent) {
	if (parent)
		this.parent = parent;
	if (data)
		this.load(data);
};

/**
 * Parent object of this item
 * null if this item is root
 * @type {Object}
 */
App.model.MyRepository.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.MyRepository.prototype.path = '/';

/**
 * MyRepository name
 * @type {string}
 */
App.model.MyRepository.prototype.name = 'Root';

/**
 * Object type (used in controllers)
 * @type {string}
 */
App.model.MyRepository.prototype.type = 'MyRepository';

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
	this.getPath();
	if (!this.components)
		return;

	this.components = this.components.map(function(child) {
		var childObj = null,
			solverObj = null;

		if (child.type === 'MyRepository')
			childObj = new App.model.MyRepository(child, this);
		else if (child.type === 'simulation') {
			solverObj = new App.model.DEVSRootSolverRT(child, this);
			childObj = new App.model.CoupledDEVSPrototype(child, solverObj);
			return childObj;
		}
		else if (child.type == 'PrototypeObject')
		{
			childObj = {parent: this};
		}
		else
			throw new Error('Unknown child type.');

		return childObj;
	}, this);
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.MyRepository.prototype.getPath = function() {
	var name = this.name === 'Root' ? '' : this.name;
	if (this instanceof App.model.DEVSRootSolverRT)
		return this.parent.getPath();
	this.path = (this.parent === null) ?
		name + '/' :
		this.parent.getPath() + name + '/';
	return this.path;
};

/**
 * Find MyRepository item in current subtree from its name
 * @param {string} name
 */
App.model.MyRepository.prototype.componentNamed = function(name) {
	var found = null;
	this.components.forEach(function(component) {
		if (component.name === name) {
			found = component;
		}
	});
	return found;
};

/**
 * Find MyRepository item from its path
 * @param {string} path
 * @returns {*}
 */
App.model.MyRepository.prototype.at = function(path) {
	var pathNames = path.substr(1, path.length-2).split('/');
	var component = this;
	if (pathNames[0] !== "") pathNames.forEach(function(pathName) {
		component = component.componentNamed(pathName);
		if (!component)
			return null;
	}, this);
	return component;
};

/**
 * Find MyRepository item with given path and rewrite it with item
 * @param {string} path
 * @param {object} item
 * @returns {*}
 */
App.model.MyRepository.prototype.put = function(path, item) {
	var component = this.at(path);
	component.load(item);
	return component;
};


/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 */
App.model.DEVSRootSolverRT = function(data, parent) {
	if (parent)
		this.parent = parent;
	if (data)
		this.load(data);
};

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
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.DEVSRootSolverRT.prototype.load = function(data) {
	angular.extend(this, data);
	this.getPath();
//	if (!this.components)
//		return;
//
//	this.components = this.components.map(function(child) {
//		var childObj = null;
//		if (child.type === 'coupled')
//			childObj = new App.model.CoupledDEVSPrototype(child);
//		else if (child.type === 'atomic')
//			childObj = new App.model.AtomicDEVSPrototype(child);
//		else
//			childObj = new Error('Unknown child type.');
//
//		childObj.parent = this;
//		return childObj;
//	}, this);
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.DEVSRootSolverRT.prototype.getPath = App.model.MyRepository.prototype.getPath;


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
 * DEVS name
 * @type {string}
 */
App.model.DEVSRootSolverRT.prototype.name = '';

/**
 * @return {App.model.DEVSRootSolverRT}
 */
App.model.BaseDEVS.prototype.rootSolver = function() {
	if (this.parent instanceof App.model.DEVSRootSolverRT)
		return this.parent;
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


/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 * @extends {App.model.BaseDEVS}
 */
App.model.CoupledDEVSPrototype = function(data, parent) {
	if (parent)
		this.parent = parent;
	if (data)
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
			childObj = new App.model.CoupledDEVSPrototype(child, this);
		else if (child.type === 'atomic')
			childObj = new App.model.AtomicDEVSPrototype(child, this);
		else
			throw new Error('Unknown child type.');

		return childObj;
	}, this);
};

/**
 *
 * @param {string} name
 */
App.model.CoupledDEVSPrototype.prototype.componentNamed = App.model.MyRepository.prototype.componentNamed;


/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 * @extends {App.model.BaseDEVS}
 */
App.model.AtomicDEVSPrototype = function(data, parent) {
	if (parent)
		this.parent = parent;
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
