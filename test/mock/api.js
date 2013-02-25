'use strict';

clientApp.factory('apiMock', ['$q', function($q) {
	var mock = {};
	var fn = function() { return this; };
	fn = fn.bind(mock);
	mock.success = mock.error = fn;

	return {
		simulations: function() { return mock; }
	};
}]);
