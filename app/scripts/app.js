'use strict';

var App = App || {};
App.controller = App.controller || {};
App.directive = App.directive || {};
App.model = App.model || {};
App.service = App.service || {};
App.utils = App.utils || {};
App.value = App.value || {};

App.inherits = function(childCtor, parentCtor)
{
	// Copy static properties
	for (var key in parentCtor)
		if (Object.prototype.hasOwnProperty.call(parentCtor, key))
			childCtor[key] = parentCtor[key];

	/** @constructor */
	function parent() {}
	parent.prototype = parentCtor.prototype;
	childCtor.superClass_ = parentCtor.prototype;
	childCtor.prototype = new parent();
	childCtor.prototype.constructor = childCtor;
};