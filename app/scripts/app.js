'use strict';

var Util = Util || {};
var App = App || {};
App.controller = App.controller || {};
App.directive = App.directive || {};
App.model = App.model || {};
App.service = App.service || {};
App.type = App.type || {};
App.value = App.value || {};

Util.inherits = function(childCtor, parentCtor)
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

/**
 * Return last item of given array
 * @param {Array} arr
 * @returns {*}
 */
Util.lastArrayItem = function(arr) {
	return arr[arr.length - 1];
};

/**
 * Remove specific item from array
 * @param {Array} arr
 * @param {*} item
 */
Util.removeArrayItem = function(arr, item) {
	var index = arr.indexOf(item);
	if (index !== -1)
		arr.splice(index, 1);
};

/**
 * Returns function that assigns a value to object property when called
 * @param {*} obj
 * @param {String} propName
 * @returns {Function}
 */
Util.passToObj = function(obj, propName) {
	return function(propValue) {
		obj[propName] = propValue;
	};
};

/**
 * Apply new data to scope when not already applying
 * @param {Scope} scope
 */
Util.safeApply = function(scope) {
	if (scope.$$phase !== '$apply')
		scope.$apply();
};
