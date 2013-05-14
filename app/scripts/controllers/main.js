'use strict';

/**
 * Handles initialization after loading the application
 * @param {Scope} $rootScope
 * @param $timeout
 * @param {App.model.MyRepository} model
 * @constructor
 */
App.controller.Main = function($rootScope, $timeout, model) {
	$rootScope.$on('WindowManager:ready', function() {
		$rootScope.$broadcast('WindowManager:openWindow', '/', model);
		$timeout(function() {
			var path = '/Simulations/Cart-Pole-Control System/';
			$rootScope.$broadcast('WindowManager:openWindow', path, model.at(path));
		}, 1000);
	});
};
