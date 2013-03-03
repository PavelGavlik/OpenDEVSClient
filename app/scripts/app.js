'use strict';

// Declare app level module which depends on filters, and services
var clientApp = angular.module('clientApp', ['ui'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
	})
	.when('/coupled/:name', {
		controller: 'MainCtrl',
		templateUrl: 'views/main.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}])
.config(['$locationProvider', function($locationProvider) {
	// $locationProvider.html5Mode(true);
}]);
