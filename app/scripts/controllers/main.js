'use strict';

clientApp.controller('MainCtrl', ['$scope', 'api', function($scope, api) {
	$scope.simulations = {components: []};


	api.simulations.success(function(simulations) {
		$scope.simulations = simulations;
	});
}]);
