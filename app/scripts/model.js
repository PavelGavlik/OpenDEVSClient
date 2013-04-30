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
		if (child.type === 'MyRepository')
			return new App.model.MyRepository(child, this);
		else if (child.type === 'simulation')
			return new App.model.DEVSRootSolverRT(child, this);
		else if (child.type == 'PrototypeObject')
			return new App.model.PrototypeObject(child, this);
		else
			throw new Error('Unknown child type: ' + child.type);
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
		if (child.type === 'coupled')
			return new App.model.CoupledDEVSPrototype(child, this);
		else if (child.type === 'atomic')
			return new App.model.AtomicDEVSPrototype(child, this);
		else
			throw new Error('Unknown child type: ' + child.type);
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
 * Contains all input ports
 * @type {Array<App.model.Port>}
 */
App.model.AtomicDEVSPrototype.prototype.inputPorts = [];

/**
 * Contains all output ports
 * @type {Array<App.model.Port>}
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
			return new App.model.InputPort(port, this);
		}, this);
	if (this.outputPorts)
		this.outputPorts = this.outputPorts.map(function(port) {
			return new App.model.OutputPort(port, this);
		}, this);
	if (this.slots)
		this.slots = this.slots.map(function(slot) {
			return new App.model.Slot(slot);
		}, this);
};

/**
 * Factory method that adds an input port
 * @param {App.model.InputPort} port
 * @returns {App.model.InputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addInputPort = function(port) {
	this.inputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an input port with given name
 * @param {String} portName
 * @returns {App.model.InputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addInputPortWithName = function(portName) {
	return this.addInputPort(new App.model.InputPort({ name: portName }, this));
};

/**
 * Factory method that adds an output port
 * @param {App.model.OutputPort} port
 * @returns {App.model.OutputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addOutputPort = function(port) {
	this.outputPorts.push(port);
	return port;
};

/**
 * Factory method that adds an output port with given name
 * @param {String} portName
 * @returns {App.model.OutputPort}
 */
App.model.AtomicDEVSPrototype.prototype.addOutputPortWithName = function(portName) {
	return this.addOutputPort(new App.model.OutputPort({ name: portName }, this));
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
 * @param {String} newName
 */
App.model.Port.prototype.rename = function(newName) {
	this.name = newName;
	this.getPath();
};


/**
 * Input Port
 * @inheritDoc
 */
App.model.InputPort = function(data, parent) {
	this.resourcePath = 'input_ports/';
	App.model.Port.call(this, data, parent);
};
Util.inherits(App.model.InputPort, App.model.Port);


/**
 * Output Port
 * @inheritDoc
 */
App.model.OutputPort = function(data, parent) {
	this.resourcePath = 'output_ports/';
	App.model.Port.call(this, data, parent);
};
Util.inherits(App.model.OutputPort, App.model.Port);


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


/**
 * Prototype Object
 * @param {Object=} data
 * @param {Object=} parent
 * @constructor
 */
App.model.PrototypeObject = function(data, parent) {
	if (parent)
		this.parent = parent;
	this.load(data);
};

/**
 * Parent object of this item
 * @type {App.model.MyRepository}
 */
App.model.PrototypeObject.prototype.parent = null;

/**
 * Full path in MyRepository hierarchy
 * @type {string}
 */
App.model.PrototypeObject.prototype.path = '/';

/**
 * Prototype Object name
 * @type {string}
 */
App.model.PrototypeObject.prototype.name = '';

/**
 * Rewrite data in object with new data
 * @param {Object} data
 */
App.model.PrototypeObject.prototype.load = function(data) {
	if (data) {
		angular.extend(this, data);
		this.getPath();
	}
};

/**
 * Return full Myrepository path in form '/path/to/object'
 * @returns {string}
 */
App.model.PrototypeObject.prototype.getPath = App.model.MyRepository.prototype.getPath;
