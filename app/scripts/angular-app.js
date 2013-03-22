'use strict';

// Declare app level module
var clientApp = angular.module('clientApp', ['ui']);

clientApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
			templateUrl: 'views/main.html'
	})
	.when('/item/:name', {
			controller: 'Main',
			templateUrl: 'views/main.html'
//			resolve: {
//				a: function($route) {console.log($route.current.params.name);}
//			}
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
clientApp.factory('model', function() {
	return new App.model.MyRepository();
});
