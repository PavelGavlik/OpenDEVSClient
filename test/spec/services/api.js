'use strict';

describe('Service: api', function () {
	var $httpBackend, api;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$httpBackend', 'api', function($h, a) {
		$httpBackend = $h;
		api = a;
	}]));

	describe('Resource', function () {
		var resource;

		beforeEach(function() {
			resource = new api._resource('/URL/');
		});

		it("should save path", function () {
			expect(resource.path).toBe('http://server:9004/URL/');
		});

		xit("should have path getter", function () {
			expect(resource.getPath()).toBe(resource.path);
		});

		it("should have default methods", function () {
			expect(typeof resource.get).toBe('function');
			expect(typeof resource.post).toBe('function');
			expect(typeof resource.patch).toBe('function');
			expect(typeof resource['delete']).toBe('function');
		});

		it("should be spyable", function () {
			spyOn(resource, 'get');
			resource.get();
			expect(resource.get).toHaveBeenCalled();
		});

		it("should make http requests", function() {
			$httpBackend.when('GET', 'http://server:9004/URL/').respond({});
			$httpBackend.expectGET('http://server:9004/URL/');
			resource.get();
			$httpBackend.flush();

			$httpBackend.when('POST', 'http://server:9004/URL/').respond({});
			$httpBackend.expectPOST('http://server:9004/URL/');
			resource.post();
			$httpBackend.flush();

			$httpBackend.when('PATCH', 'http://server:9004/URL/').respond({});
			$httpBackend.expectPATCH('http://server:9004/URL/');
			resource.patch();
			$httpBackend.flush();

			$httpBackend.when('DELETE', 'http://server:9004/URL/').respond({});
			$httpBackend.expectDELETE('http://server:9004/URL/');
			resource.delete();
			$httpBackend.flush();
		});
	});

	describe("MyRepositoryItemResource", function () {
		var resource;

		beforeEach(function() {
			resource = new api.MyRepository(new App.model.MyRepository());
		});

		it('should list MyRepository items', function() {
			$httpBackend.when('GET', 'http://server:9004/').respond({});
			$httpBackend.expectGET('http://server:9004/');
			resource.get();
			$httpBackend.flush();
		});

		it("should be able to rename MyRepository item", function () {
			$httpBackend.when('PATCH', 'http://server:9004/').respond({});
			$httpBackend.expectPATCH('http://server:9004/', {name: 'renamed'});
			resource.rename('renamed');
			$httpBackend.flush();
		});
	});

	describe("DEVSRootSolverRTResource", function () {
		var resource;

		beforeEach(function() {
			var model = new App.model.MyRepository({name: 'Root', type: 'MyRepository', components: [
				{name: 'Simulations', type: 'MyRepository', components: [
					{name: 'sim', type: 'simulation', running: true}
				]}
			]});
			resource = new api.DEVSRootSolverRT(model.at('/Simulations/sim/'));
		});

		it("should be able to change simulation state", function () {
			$httpBackend.when('PATCH', 'http://server:9004/Simulations/sim/').respond({});
			$httpBackend.expectPATCH('http://server:9004/Simulations/sim/', {running: true});
			resource.changeRunningState(true);
			$httpBackend.flush();
		});

		it("should be able to reset simulation", function () {
			$httpBackend.when('PATCH', 'http://server:9004/Simulations/sim/').respond({});
			$httpBackend.expectPATCH('http://server:9004/Simulations/sim/', {reset: true});
			resource.resetSimulation();
			$httpBackend.flush();
		});
	});

	describe("InputPortResource", function () {
		var resource;

		beforeEach(function() {
			var atomic = new App.model.AtomicDEVSPrototype({name: 'atomic'}, new App.model.MyRepository());
			var port = new App.model.InputPort({name: 'newPort'}, atomic);
			resource = new api.InputPort(port);
		});

		it("should implement POST request", function () {
			$httpBackend.when('POST', 'http://server:9004/atomic/input_ports/').respond({});
			$httpBackend.expectPOST('http://server:9004/atomic/input_ports/', resource);
			resource.post();
			$httpBackend.flush();
		});

		it("should implement DELETE request", function () {
			$httpBackend.when('DELETE', 'http://server:9004/atomic/input_ports/newPort/').respond({});
			$httpBackend.expectDELETE('http://server:9004/atomic/input_ports/newPort/');
			resource.delete();
			$httpBackend.flush();
		});
	});

	describe("OutputPortResource", function () {
		var resource;

		beforeEach(function() {
			var atomic = new App.model.AtomicDEVSPrototype({name: 'atomic'}, new App.model.MyRepository());
			var port = new App.model.OutputPort({name: 'newPort'}, atomic);
			resource = new api.OutputPort(port);
		});

		it("should implement POST request", function () {
			$httpBackend.when('POST', 'http://server:9004/atomic/output_ports/').respond({});
			$httpBackend.expectPOST('http://server:9004/atomic/output_ports/', resource);
			resource.post();
			$httpBackend.flush();
		});

		it("should implement DELETE request", function () {
			$httpBackend.when('DELETE', 'http://server:9004/atomic/output_ports/newPort/').respond({});
			$httpBackend.expectDELETE('http://server:9004/atomic/output_ports/newPort/');
			resource.delete();
			$httpBackend.flush();
		});
	});

	describe("SlotResource", function () {
		var resource, slot;

		beforeEach(function() {
			var atomic = new App.model.AtomicDEVSPrototype({name: 'atomic'}, new App.model.MyRepository());
			slot = new App.model.Slot({name: 'newSlot', value: 'val'}, atomic);
			resource = new api.Slot(slot);
		});

		it("should implement POST request", function () {
			$httpBackend.when('POST', 'http://server:9004/atomic/slots/').respond({});
			$httpBackend.expectPOST('http://server:9004/atomic/slots/', resource);
			resource.post();
			$httpBackend.flush();
		});

		it("should implement DELETE request", function () {
			$httpBackend.when('DELETE', 'http://server:9004/atomic/slots/newSlot/').respond({});
			$httpBackend.expectDELETE('http://server:9004/atomic/slots/newSlot/');
			resource.delete();
			$httpBackend.flush();
		});

		it("should be able to inject value", function() {
			$httpBackend.when('PATCH', 'http://server:9004/atomic/slots/newSlot/').respond({});
			$httpBackend.expectPATCH('http://server:9004/atomic/slots/newSlot/', {value: 'new'});
			resource.injectValue('new');
			$httpBackend.flush();
		});
	});

	describe("DelegateResource", function () {
		var resource;

		beforeEach(function() {
			var atomic = new App.model.AtomicDEVSPrototype({name: 'atomic'}, new App.model.MyRepository());
			var delegate = new App.model.Delegate({name: 'new'}, atomic);
			resource = new api.Delegate(delegate);
		});

		it("should implement POST request", function () {
			$httpBackend.when('POST', 'http://server:9004/atomic/delegates/').respond({});
			$httpBackend.expectPOST('http://server:9004/atomic/delegates/', resource);
			resource.post();
			$httpBackend.flush();
		});

		it("should implement DELETE request", function () {
			$httpBackend.when('DELETE', 'http://server:9004/atomic/delegates/new/').respond({});
			$httpBackend.expectDELETE('http://server:9004/atomic/delegates/new/');
			resource.delete();
			$httpBackend.flush();
		});
	});
});
