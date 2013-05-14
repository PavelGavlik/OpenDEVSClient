'use strict';

describe('Service: computeSubmodelSize', function () {
	var service, svgRoot;

	beforeEach(module('clientApp'));

	beforeEach(inject(function(computeSubmodelSize) {
		service = computeSubmodelSize;
		svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		document.body.appendChild(svgRoot);
	}));

	afterEach(function() {
		document.body.innerHTML = '';
	});

	function tolerance(input, expected, tolerance) {
		return Math.abs(input - expected) <= tolerance;
	}

	it('should compute size for submodel with ports have bigger size than name', function() {
		var size = service(svgRoot, {
			name: 'experimental frame',
			inputPorts: [{name: 'state'}, {name: 'endOfEpisode'}],
			outputPorts: [{name: 'startNewEpisode'}]
		});
		expect(tolerance(size.x, 220, 10)).toBe(true);
		expect(tolerance(size.y, 50, 10)).toBe(true);
	});

	it('should compute size for submodel where ports have smaller size than name', function() {
		var size = service(svgRoot, {
			name: 'generator',
			inputPorts: [],
			outputPorts: [{name: 'out'}]
		});
		expect(tolerance(size.x, 72, 10)).toBe(true);
		expect(tolerance(size.y, 35, 10)).toBe(true);
	});
});
