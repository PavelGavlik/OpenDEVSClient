'use strict';

describe('Model: AtomicDEVSPrototype', function () {
	/** @type{App.model.PrototypeObject} */
	var prototype;

	beforeEach(function () {
		prototype = new App.model.PrototypeObject();
	});

	it("should be able to load data via constructor", function () {
		prototype = new App.model.PrototypeObject({name: 'foo'}, new App.model.MyRepository());
		expect(prototype.name).toBe('foo');
	});
});
