'use strict';

clientApp.factory('api', ['$http', function($http) {
	return {
		simulations: $http.get('http://localhost:9004/')
	};
}]);
