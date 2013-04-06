'use strict';

describe('Model: InputPort', function () {
	var port;

	beforeEach(function () {
		port = new App.model.InputPort({}, new App.model.AtomicDEVSPrototype());
	});

	it('should be able to load new data', function() {
		expect(port.name).toBe('');
		port.load({name: 'new'});
		expect(port.name).toBe('new');
		expect(port.path).toBe('/input_ports/new/');
	});

	it("should be able to rename itself", function () {
		port.rename('myNew');
		expect(port.name).toBe('myNew');
		expect(port.path).toBe('/input_ports/myNew/');
	});
});
