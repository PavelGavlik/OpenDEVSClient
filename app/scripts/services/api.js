'use strict';

clientApp.factory('api', ['$http', '$location', '$q', function($http, $location, $q) {
	var host = $location.host();
	return {
		simulations: function() {
			return $http.get('http://'+ host +':9004/Simulations/');
		}
	};
}]);
