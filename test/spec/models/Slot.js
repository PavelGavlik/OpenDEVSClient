'use strict';

describe('Model: Slot', function () {
	var slot;

	beforeEach(function () {
		slot = new App.model.Slot();
	});

	it('should be able to load new data', function() {
		expect(slot.name).toBe('');
		slot.load({name: 'new'});
		expect(slot.name).toBe('new');
	});
});
