'use strict';

// Declare app level module which depends on filters, and services
var clientApp = angular.module('clientApp', ['ui']);
clientApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html'
	})
	.when('/item/:name', {
		controller: 'MainCtrl',
		templateUrl: 'views/main.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);
//clientApp.config(['$locationProvider', function($locationProvider) {
	// $locationProvider.html5Mode(true);
//}]);

clientApp.controller(App.controller);
clientApp.directive(App.directive);
clientApp.factory(App.service);