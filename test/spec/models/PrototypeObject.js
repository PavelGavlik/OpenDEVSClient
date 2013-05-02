'use strict';

describe('Model: PrototypeObject', function () {
	/** @type{App.model.PrototypeObject} */
	var prototype;

	beforeEach(function () {
		prototype = new App.model.PrototypeObject();
	});

	it("should be able to load data via constructor", function () {
		prototype = new App.model.PrototypeObject({name: 'foo'}, new App.model.MyRepository());
		expect(prototype.name).toBe('foo');
	});

	it("should be able to add slot", function () {
		expect(prototype.slots.length).toBe(0);
		var returnedSlot = prototype.addSlot('mySlot');
		expect(returnedSlot).toBe(prototype.slots[0]);
		expect(returnedSlot.parent).toBe(prototype);
		expect(prototype.slots.length).toBe(1);
		expect(prototype.slots[0].name).toBe('mySlot');
	});

	it("should be able to delete slot", function () {
		prototype.slots = [];
		prototype.addSlot('mySlot');
		prototype.addSlot('mySlot2');
		prototype.deleteSlot(prototype.slots[0]);
		expect(prototype.slots.length).toBe(1);
		expect(prototype.slots[0].name).toBe('mySlot2');
	});

	it("should be able to add delegate", function () {
		expect(prototype.delegates.length).toBe(0);
		var returnedDelegate = prototype.addDelegate('myy');
		expect(returnedDelegate).toBe(prototype.delegates[0]);
		expect(returnedDelegate.parent).toBe(prototype);
		expect(prototype.delegates.length).toBe(1);
		expect(prototype.delegates[0].name).toBe('myy');
	});

	it("should be able to delete delegate", function () {
		prototype.delegates = [];
		prototype.addDelegate('my');
		prototype.addDelegate('my2');
		prototype.deleteDelegate(prototype.delegates[0]);
		expect(prototype.delegates.length).toBe(1);
		expect(prototype.delegates[0].name).toBe('my2');
	});
});
