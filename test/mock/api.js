'use strict';

clientApp.factory('apiMock', ['$q', function($q) {
	return {
		simulations: function() {
			return {success: jasmine.createSpy()}
		}
	};
}]);
