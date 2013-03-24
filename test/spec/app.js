'use strict';

describe('Util', function () {
	describe("removeArrayItem", function () {
		it("should remove first found item occurence", function () {
			var arr = [1, 2, 2, 3];
			Util.removeArrayItem(arr, 2);
			expect(arr).toEqual([1, 2, 3])
		});

		it("it should not remove anything when not found", function () {
			var arr = [1, 2];
			Util.removeArrayItem(arr, 3);
			expect(arr).toEqual([1, 2]);
		});
	});

	describe("lastArrayItem", function () {
		it("should return last item", function () {
			var arr = [1, 2, 3];
			expect(Util.lastArrayItem(arr)).toBe(3);
		});

		it("should return undefined for empty array", function () {
			var arr = [];
			expect(Util.lastArrayItem(arr)).toBe(undefined)
		});
	});

	describe("passToObj", function () {
		it('should update object when needed', function() {
			var simulations = {myKey: 'value'};
			Util.passToObj(simulations, 'myKey')('new');
			expect(simulations.myKey).toBe('new');
		});
	});
});
