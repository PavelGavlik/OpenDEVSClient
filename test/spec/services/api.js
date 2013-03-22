'use strict';

describe('Service: api', function () {
	var $httpBackend, api;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$httpBackend', 'api', function($h, a) {
		$httpBackend = $h;
		api = a;
	}]));

	it('should list MyRepository items', function() {
		$httpBackend.when('GET', 'http://server:9004/Simulations/').respond({});
		$httpBackend.expectGET('http://server:9004/Simulations/');
		api.MyRepository('/Simulations/');
		$httpBackend.flush();
	});

	xit('should be able to change simulation state', function() {
		var model = new App.model.MyRepository({name: 'Root', type: 'MyRepository', components: [
			{name: 'Simulations', type: 'MyRepository', components: [
				{name: 'sim', type: 'simulation', running: true}
			]}
		]});
		$httpBackend.when('PUT', 'http://server:9004/sim/').respond({});
		$httpBackend.expectPUT('http://server:9004/Simulations/sim/', model.components[0]);
		api.DEVSRootSolverRT.changeRunningState(new App.model.DEVSRootSolverRT(model.components[0]), true);
		$httpBackend.flush();
	});
});
