'use strict';

clientApp.factory('api', ['$http', '$location', function($http, $location) {
	var host = $location.host();
	return {
		simulations: function() {
			return $http.get('http://'+ host +':9004/Simulations/');
		}
	};
}]);
