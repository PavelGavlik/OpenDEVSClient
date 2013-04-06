'use strict';

var successPromise = {
	success: function(fn) {fn(); return successPromise;},
	error: function(fn) {return successPromise;}
};

var errorPromise = {
	success: function(fn) {return errorPromise;},
	error: function(fn) {fn(); return errorPromise;}
};

var allPromise = {
	success: function(fn) {	fn(); return allPromise;},
	error: function(fn) {fn(); return allPromise;}
};


var $window = {
	alert: angular.noop,
	prompt: angular.noop
};
