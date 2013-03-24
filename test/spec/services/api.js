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
			expect(typeof resource.put).toBe('function');
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

			$httpBackend.when('PUT', 'http://server:9004/URL/').respond({});
			$httpBackend.expectPUT('http://server:9004/URL/');
			resource.put();
			$httpBackend.flush();

			$httpBackend.when('DELETE', 'http://server:9004/URL/').respond({});
			$httpBackend.expectDELETE('http://server:9004/URL/');
			resource.delete();
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
			$httpBackend.when('PUT', 'http://server:9004/Simulations/sim/').respond({});
			$httpBackend.expectPUT('http://server:9004/Simulations/sim/', {running: true});
			resource.changeRunningState(true);
			$httpBackend.flush();
		});

		it("should be able to reset simulation", function () {
			$httpBackend.when('PUT', 'http://server:9004/Simulations/sim/').respond({});
			$httpBackend.expectPUT('http://server:9004/Simulations/sim/', {reset: true});
			resource.resetSimulation();
			$httpBackend.flush();
		});
	});

	describe("PortResource", function () {
		var resource;

		beforeEach(function() {
			resource = new api.Port(new App.model.Port());
		});

		xit("should be able to get port over network", function () {
			resource.get();
		});
	});

	it('should list MyRepository items', function() {
		$httpBackend.when('GET', 'http://server:9004/Simulations/').respond({});
		$httpBackend.expectGET('http://server:9004/Simulations/');
		var resource = new api.MyRepository('/Simulations/');
		resource.get();
		$httpBackend.flush();
	});
});
