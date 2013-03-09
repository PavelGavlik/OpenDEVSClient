'use strict';

App.service.api = function($http, $location) {
	var host = $location.host();
	return {
		simulations: function() {
			return $http.get('http://'+ host +':9004/Simulations/');
		}
	};
};