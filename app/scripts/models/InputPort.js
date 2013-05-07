'use strict';

/**
 * Input Port
 * @inheritDoc
 */
App.model.InputPort = function(data, parent) {
	this.resourcePath = 'input_ports/';
	App.model.Port.call(this, data, parent);
};
Util.inherits(App.model.InputPort, App.model.Port);
