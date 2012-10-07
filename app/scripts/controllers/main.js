'use strict';

clientApp.controller('MainCtrl', ['$scope', 'api', function($scope, api) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Testacular'
	];
	$scope.simulations = {components: []};


	api.simulations.success(function(simulations) {
		$scope.simulations = simulations;
	});
}]);
