'use strict';

clientApp.factory('apiMock', [function() {
	return {
		simulations: {
			success: jasmine.createSpy()
		}
	};
}]);
