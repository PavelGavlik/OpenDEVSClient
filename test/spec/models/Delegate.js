'use strict';

describe('Model: Delegate', function () {
	var delegate;

	beforeEach(function () {
		delegate = new App.model.Delegate({}, new App.model.AtomicDEVSPrototype());
	});

	it('should be able to load new data', function() {
		expect(delegate.name).toBe('');
		delegate.load({name: 'new'});
		expect(delegate.name).toBe('new');
	});

	it("should be able to rename itself", function () {
		delegate.rename('myNew');
		expect(delegate.name).toBe('myNew');
		expect(delegate.path).toBe('/delegates/myNew/');
	});
});
