'use strict';

describe('Model: CoupledDEVSPrototype', function () {
	/** @type{App.model.CoupledDEVSPrototype} */
	var coupled;

	beforeEach(function () {
		coupled = new App.model.CoupledDEVSPrototype();
	});

	it('should be able to load new data', function() {
		expect(coupled.name).toBe('');
		coupled.load({
			name: 'new',
			components: [
				{name: 'input', type: 'coupled'},
				{name: 'input', type: 'atomic'}
			]
		});
		expect(coupled.name).toBe('new');
		expect(coupled.components.length).toBe(2);
	});

	it("should be able to add component", function () {
		expect(coupled.components.length).toBe(0);
		var component = new App.model.DEVSRootSolverRT();
		coupled.addComponent(component);
		expect(component.parent).toBe(coupled);
		expect(coupled.components.length).toBe(1);
		expect(coupled.components[0]).toBe(component);
	});

	it("should be able to delete component", function () {
		expect(coupled.components.length).toBe(0);
		coupled.addComponent(new App.model.CoupledDEVSPrototype({name: 'c1'}));
		coupled.addComponent(new App.model.AtomicDEVSPrototype({name: 'c2'}));
		coupled.deleteComponent(coupled.components[0]);
		expect(coupled.components.length).toBe(1);
		expect(coupled.components[0].name).toBe('c2');
	});
});
