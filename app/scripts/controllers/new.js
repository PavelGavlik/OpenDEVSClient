'use strict';

clientApp.controller('NewCtrl', function($scope, $routeParams) {
	console.log($routeParams.name);
	$scope.$on('MyRepository:ready', function() {
		$scope.$emit('openWindow', $routeParams.name);
	});
	
});
