'use strict';

describe('Model: Method', function () {
	var method;

	beforeEach(function () {
		method = new App.model.Method({}, new App.model.AtomicDEVSPrototype());
	});

	it('should be able to load new data', function() {
		expect(method.name).toBe('');
		method.load({name: 'new'});
		expect(method.name).toBe('new');
	});
});
