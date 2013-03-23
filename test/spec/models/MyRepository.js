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
			name: 'new'
		});
		expect(repo.name).toBe('new');
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
});
