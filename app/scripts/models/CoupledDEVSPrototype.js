'use strict';

/**
 *
 * @constructor
 * @param {Object=} data
 * @param {Object=} parent
 * @extends {App.model.BaseDEVS}
 */
App.model.CoupledDEVSPrototype = function(data, parent) {
	App.model.BaseDEVS.call(this);

	/**
	 * Object type (used in controllers)
	 * @type {string}
	 */
	this.type = 'coupled';

	/**
	 * Children of this item
	 * @type {Array}
	 */
	this.components = [];

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
 * Factory method that adds a component
 * @param {Object} component
 */
App.model.CoupledDEVSPrototype.prototype.addComponent = App.model.MyRepository.prototype.addComponent;

/**
 * Remove given component
 * @param {Object} component
 */
App.model.CoupledDEVSPrototype.prototype.deleteComponent = App.model.MyRepository.prototype.deleteComponent;
