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

	it("should be able to add input port", function () {
		expect(atomic.inputPorts.length).toBe(0);
		var returnedPort = atomic.addInputPort(new App.model.InputPort({name: 'myInput'}, atomic));
		expect(returnedPort).toBe(atomic.inputPorts[0]);
		expect(atomic.inputPorts.length).toBe(1);
		expect(atomic.inputPorts[0].name).toBe('myInput');
		expect(atomic.inputPorts[0].parent).toBe(atomic);
	});

	it("should be able to add input port with name", function () {
		expect(atomic.inputPorts.length).toBe(0);
		var returnedPort = atomic.addInputPortWithName('myInput');
		expect(returnedPort).toBe(atomic.inputPorts[0]);
		expect(atomic.inputPorts.length).toBe(1);
		expect(atomic.inputPorts[0].name).toBe('myInput');
		expect(atomic.inputPorts[0].parent).toBe(atomic);
	});

	it("should be able to add output port", function () {
		expect(atomic.outputPorts.length).toBe(0);
		var returnedPort = atomic.addOutputPort(new App.model.OutputPort({name: 'myOutput'}, atomic));
		expect(returnedPort).toBe(atomic.outputPorts[0]);
		expect(atomic.outputPorts.length).toBe(1);
		expect(atomic.outputPorts[0].name).toBe('myOutput');
		expect(atomic.outputPorts[0].parent).toBe(atomic);
	});

	it("should be able to add output port with name", function () {
		expect(atomic.outputPorts.length).toBe(0);
		var returnedPort = atomic.addOutputPortWithName('myOutput');
		expect(returnedPort).toBe(atomic.outputPorts[0]);
		expect(atomic.outputPorts.length).toBe(1);
		expect(atomic.outputPorts[0].name).toBe('myOutput');
		expect(atomic.outputPorts[0].parent).toBe(atomic);
	});

	it("should be able to delete port", function () {
		atomic.addInputPortWithName('myPort');
		atomic.addInputPortWithName('myPort2');
		atomic.addOutputPortWithName('myPort');
		atomic.addOutputPortWithName('myPort2');

		atomic.deletePort(atomic.inputPorts[0]);
		expect(atomic.inputPorts.length).toBe(1);
		expect(atomic.outputPorts.length).toBe(2);
		expect(atomic.inputPorts[0].name).toBe('myPort2');

		atomic.deletePort(atomic.outputPorts[0]);
		expect(atomic.inputPorts.length).toBe(1);
		expect(atomic.outputPorts.length).toBe(1);
		expect(atomic.outputPorts[0].name).toBe('myPort2');
	});

	it("should be able to add slot", function () {
		expect(atomic.slots.length).toBe(0);
		var returnedSlot = atomic.addSlot('mySlot');
		expect(returnedSlot).toBe(atomic.slots[0]);
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
});
