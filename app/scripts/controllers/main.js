'use strict';

/**
 * Handles initialization after loading the application
 * @param {Scope} $rootScope
 * @param {App.model.MyRepository} model
 * @constructor
 */
App.controller.Main = function($rootScope, model) {
	$rootScope.$on('WindowManager:ready', function() {
		$rootScope.$broadcast('WindowManager:openWindow', '/', model);
		setTimeout(function() {
			var path = '/Simulations/Generator and Processor/processor/';
			$rootScope.$broadcast('WindowManager:openWindow', path, model.at(path));
		}, 2000);
	});
};
