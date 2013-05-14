'use strict';

describe('Model: BaseDEVS', function () {
	/** @type{App.model.BaseDEVS} */
	var devs;

	beforeEach(function () {
		devs = new App.model.BaseDEVS();
	});

	it('should be able to load new data', function() {
		expect(devs.name).toBe('');
		devs.load({
			name: 'new',
			inputPorts: [{name: 'input'}],
			outputPorts: [{name: 'output'}]
		});
		expect(devs.name).toBe('new');
		expect(devs.inputPorts.length).toBe(1);
		expect(devs.outputPorts.length).toBe(1);
	});

	it("should be able to add input port", function () {
		devs.inputPorts = [];
		expect(devs.inputPorts.length).toBe(0);
		var returnedPort = devs.addInputPort('myInput');
		expect(returnedPort).toBe(devs.inputPorts[0]);
		expect(devs.inputPorts.length).toBe(1);
		expect(devs.inputPorts[0].name).toBe('myInput');
		expect(devs.inputPorts[0].parent).toBe(devs);
	});

	it("should be able to add output port", function () {
		devs.outputPorts = [];
		expect(devs.outputPorts.length).toBe(0);
		var returnedPort = devs.addOutputPort('myOutput');
		expect(returnedPort).toBe(devs.outputPorts[0]);
		expect(devs.outputPorts.length).toBe(1);
		expect(devs.outputPorts[0].name).toBe('myOutput');
		expect(devs.outputPorts[0].parent).toBe(devs);
	});

	it("should be able to delete port", function () {
//		devs.inputPorts = [];
//		devs.outputPorts = [];
		devs.addInputPort('myPort');
		devs.addInputPort('myPort2');
		devs.addOutputPort('myPort');
		devs.addOutputPort('myPort2');

		devs.deletePort(devs.inputPorts[0]);
		expect(devs.inputPorts.length).toBe(1);
		expect(devs.outputPorts.length).toBe(2);
		expect(devs.inputPorts[0].name).toBe('myPort2');

		devs.deletePort(devs.outputPorts[0]);
		expect(devs.inputPorts.length).toBe(1);
		expect(devs.outputPorts.length).toBe(1);
		expect(devs.outputPorts[0].name).toBe('myPort2');
	});
});
