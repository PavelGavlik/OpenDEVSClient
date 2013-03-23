'use strict';

clientApp.factory('apiMock', ['$q', function($q) {
	var mock = {};
	var fn = function() { this.calls++; return this; };
	fn = fn.bind(mock);
	mock.success = mock.error = fn;
	var mockFn = function mockFn() { mockFn.calls++; return mock; };
	mockFn.calls = 0;

	return {
		DEVSRootSolverRT: {
			changeRunningState: mockFn,
			resetSimulation: mockFn
		},
		MyRepository: mockFn
	};
}]);
