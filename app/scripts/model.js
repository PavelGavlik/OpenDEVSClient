/**
 * MyRepository is a folder which contains named components
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 */
App.model.MyRepository = function(data, parent) {
	/**
	 * Parent object of this item
	 * null if this item is root
	 * @type {App.model.MyRepository}
	 */
	this.parent = parent || null;

	if (data)
		this.load(data);
};

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
		var childObj = null;

		if (child.type === 'MyRepository')
			childObj = new App.model.MyRepository(child, this);
		else if (child.type === 'simulation')
			childObj = new App.model.DEVSRootSolverRT(child, this);
		else if (child.type == 'PrototypeObject')
			childObj = {parent: this};
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
Util.inherits(App.model.CoupledDEVSPrototype, App.model.BaseDEVS);

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
Util.inherits(App.model.AtomicDEVSPrototype, App.model.BaseDEVS);


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


/**
 * Contains all input ports
 * @type {Array<App.model.Port>}
 */
App.model.AtomicDEVSPrototype.prototype.inputPorts = [];

/**
 * Contains all output ports
 * @type {Array<App.model.Slot>}
 */
App.model.AtomicDEVSPrototype.prototype.outputPorts = [];

/**
 * Contains all slots
 * @type {Array<App.model.Slot>}
 */
App.model.AtomicDEVSPrototype.prototype.slots = [];

/**
* Rewrite data in object with new data
* @param {Object} data
*/
App.model.AtomicDEVSPrototype.prototype.load = function(data) {
	App.model.BaseDEVS.prototype.load.call(this, data);
	if (this.inputPorts)
		this.inputPorts = this.inputPorts.map(function(port) {
			return new App.model.Port(port);
		});
	if (this.outputPorts)
		this.outputPorts = this.outputPorts.map(function(port) {
			return new App.model.Port(port);
		});
	if (this.slots)
		this.slots = this.slots.map(function(slot) {
			return new App.model.Slot(slot);
		});
};

/**
 * Factory method that adds an input port
 * @param {String} portName
 */
App.model.AtomicDEVSPrototype.prototype.addInputPort = function(portName) {
	var port = new App.model.Port({ name: portName });
	this.inputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an output port
 * @param {String} portName
 */
App.model.AtomicDEVSPrototype.prototype.addOutputPort = function(portName) {
	var port = new App.model.Port({ name: portName });
	this.outputPorts.push(port);
	return port;
};

/**
 * Remove given port
 * @param {App.model.Port} port
 */
App.model.AtomicDEVSPrototype.prototype.deletePort = function(port) {
	Util.removeArrayItem(this.inputPorts, port);
	Util.removeArrayItem(this.outputPorts, port);
};

/**
 * Factory method that adds a slot
 * @param {String} slotName
 */
App.model.AtomicDEVSPrototype.prototype.addSlot = function(slotName) {
	var slot = new App.model.Slot({ name: slotName });
	this.slots.push(slot);
	return slot;
};

/**
 * Remove given slot
 * @param {App.model.Slot} slot
 */
App.model.AtomicDEVSPrototype.prototype.deleteSlot = function(slot) {
	Util.removeArrayItem(this.slots, slot);
};


/**
 *
 * @param {Object=} data
 * @constructor
 */
App.model.Port = function(data) {
	this.load(data);
};

/**
 * Port name
 * @type {string}
 */
App.model.Port.prototype.name = '';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.Port.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
	}
};


/**
 *
 * @param {Object=} data
 * @constructor
 */
App.model.Slot = function(data) {
	this.load(data);
};

/**
 * Slot name
 * @type {string}
 */
App.model.Slot.prototype.name = '';

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
	}
};
