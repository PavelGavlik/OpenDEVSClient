'use strict';

describe('angular-app', function() {
	beforeEach(module('clientApp'));

	it("should have model service", inject(function(model) {
		expect(model instanceof App.model.MyRepository).toBe(true);
	}));
});
