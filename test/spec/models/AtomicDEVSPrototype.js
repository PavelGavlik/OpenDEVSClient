'use strict';

describe('Model: AtomicDEVSPrototype', function () {
	/** @type{App.model.AtomicDEVSPrototype} */
	var atomic;

	beforeEach(function () {
		atomic = new App.model.AtomicDEVSPrototype();
	});

	it('should be able to load new data', function() {
		expect(atomic.name).toBe('');
		atomic.load({
			name: 'new',
			inputPorts: [{name: 'input'}],
			outputPorts: [{name: 'output'}],
			slots: [{name: 'slot'}]
		});
		expect(atomic.name).toBe('new');
		expect(atomic.inputPorts.length).toBe(1);
		expect(atomic.outputPorts.length).toBe(1);
		expect(atomic.slots.length).toBe(1);
	});

	it("should be able to load data via constructor", function () {
		atomic = new App.model.AtomicDEVSPrototype({name: 'new'}, new App.model.MyRepository());
		expect(atomic.name).toBe('new');
		expect(atomic.parent instanceof App.model.MyRepository).toBe(true);
	});

	it("should be able to add slot", function () {
		expect(atomic.slots.length).toBe(0);
		var returnedSlot = atomic.addSlot('mySlot');
		expect(returnedSlot).toBe(atomic.slots[0]);
		expect(returnedSlot.parent).toBe(atomic);
		expect(atomic.slots.length).toBe(1);
		expect(atomic.slots[0].name).toBe('mySlot');
	});

	it("should be able to delete slot", function () {
		atomic.addSlot('mySlot');
		atomic.addSlot('mySlot2');
		atomic.deleteSlot(atomic.slots[0]);
		expect(atomic.slots.length).toBe(1);
		expect(atomic.slots[0].name).toBe('mySlot2');
	});

	it("should be able to add delegate", function () {
		expect(atomic.delegates.length).toBe(0);
		var returnedDelegate = atomic.addDelegate('my');
		expect(returnedDelegate).toBe(atomic.delegates[0]);
		expect(returnedDelegate.parent).toBe(atomic);
		expect(atomic.delegates.length).toBe(1);
		expect(atomic.delegates[0].name).toBe('my');
	});

	it("should be able to delete delegate", function () {
		atomic.addDelegate('my');
		atomic.addDelegate('my2');
		atomic.deleteDelegate(atomic.delegates[0]);
		expect(atomic.delegates.length).toBe(1);
		expect(atomic.delegates[0].name).toBe('my2');
	});

	it("should be able to add method", function () {
		expect(atomic.methods.length).toBe(0);
		var returnedMethod = atomic.addMethod('myMethod');
		expect(returnedMethod).toBe(atomic.methods[0]);
		expect(returnedMethod.parent).toBe(atomic);
		expect(atomic.methods.length).toBe(1);
		expect(atomic.methods[0].name).toBe('myMethod');
	});

	it("should be able to delete method", function () {
		atomic.methods = [];
		atomic.addMethod('myMethod');
		atomic.addMethod('myMethod2');
		atomic.deleteMethod(atomic.methods[0]);
		expect(atomic.methods.length).toBe(1);
		expect(atomic.methods[0].name).toBe('myMethod2');
	});
});
