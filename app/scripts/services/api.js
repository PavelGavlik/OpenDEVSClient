'use strict';

clientApp.factory('api', ['$http', function($http) {
	return {
		simulations: $http.get('/fixtures/simulations.json')
	};
}]);
