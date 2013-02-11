'use strict';

describe('Service: api', function () {
	var api;

	beforeEach(module('clientApp'));

	beforeEach(inject(function($httpBackend) {
		$httpBackend.when('GET', 'http://server:9004/Simulations/').respond({});
	}));

	it('should list MyRepository items', inject(function(api, $httpBackend) {
		$httpBackend.expectGET('http://server:9004/Simulations/');
		api.simulations();
		$httpBackend.flush();
	}));
});
