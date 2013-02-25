'use strict';

clientApp.controller('NewCtrl', function($scope, $routeParams) {
	$scope.$on('MyRepository:ready', function() {
		$scope.$emit('openWindow', $routeParams.name);
	});
	
});
