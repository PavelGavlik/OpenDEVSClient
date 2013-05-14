'use strict';

describe('Model: MyRepository', function () {
	/** @type{App.model.MyRepository} */
	var repo;

	beforeEach(function () {
		repo = new App.model.MyRepository();
	});

	it('should be able to load new data', function() {
		expect(repo.name).toBe('Root');
		repo.load({
			name: 'new',
			components: [{name: 'c', type: 'PrototypeObject'}]
		});
		expect(repo.name).toBe('new');
		expect(repo.components.length).toBe(1);
	});

	it("should be able to load data via constructor", function () {
		repo = new App.model.MyRepository({name: 'new'}, new App.model.MyRepository({name: 'parent'}));
		expect(repo.name).toBe('new');
		expect(repo.parent instanceof App.model.MyRepository).toBe(true);
		expect(repo.parent.name).toBe('parent');
	});

	it("be able to find component", function () {
		repo.load({components: [
			{name: '1', type: 'MyRepository'}, {name: '2', type: 'simulation'}
		]});
		expect(repo.componentNamed('2').name).toBe('2');
	});

	it("should be able to add component", function () {
		expect(repo.components.length).toBe(0);
		var component = new App.model.DEVSRootSolverRT();
		repo.addComponent(component);
		expect(component.parent).toBe(repo);
		expect(repo.components.length).toBe(1);
		expect(repo.components[0]).toBe(component);
	});

	it("should be able to delete component", function () {
		repo.components = [];
		expect(repo.components.length).toBe(0);
		repo.addComponent(new App.model.DEVSRootSolverRT({name: 'c1'}));
		repo.addComponent(new App.model.DEVSRootSolverRT({name: 'c2'}));
		repo.deleteComponent(repo.components[0]);
		expect(repo.components.length).toBe(1);
		expect(repo.components[0].name).toBe('c2');
	});
});
