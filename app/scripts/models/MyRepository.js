'use strict';

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
 * Factory method that adds a component
 * @param {Object} component
 */
App.model.MyRepository.prototype.addComponent = function(component) {
	component.parent = this;
	component.getPath();
	this.components.push(component);
};

/**
 * Remove given component
 * @param {Object} component
 */
App.model.MyRepository.prototype.deleteComponent = function(component) {
	Util.removeArrayItem(this.components, component);
};
