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

		it("have default methods", function () {
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
		it("should create internal resource", function () {
			var solver = new api.DEVSRootSolverRT(new App.model.DEVSRootSolverRT());
			expect(solver._resource instanceof api._resource).toBe(true);
		});

		it("should be able to change simulation state", function () {
			var model = new App.model.MyRepository({name: 'Root', type: 'MyRepository', components: [
				{name: 'Simulations', type: 'MyRepository', components: [
					{name: 'sim', type: 'simulation', running: true}
				]}
			]});
			$httpBackend.when('PUT', 'http://server:9004/Simulations/sim/').respond({});
			$httpBackend.expectPUT('http://server:9004/Simulations/sim/', {running: true});
			var resource = new api.DEVSRootSolverRT(model.at('/Simulations/sim/'));
			resource.changeRunningState(true);
			$httpBackend.flush();
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
