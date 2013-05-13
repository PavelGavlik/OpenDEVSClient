'use strict';

/**
 * Output Port
 * @param {Object=} data
 * @param {App.model.BaseDEVS} parent
 * @extends {App.model.Port}
 */
App.model.OutputPort = function(data, parent) {
	this.resourcePath = 'output_ports/';
	App.model.Port.call(this, data, parent);
};
Util.inherits(App.model.OutputPort, App.model.Port);
