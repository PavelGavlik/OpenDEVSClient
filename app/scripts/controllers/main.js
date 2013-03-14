'use strict';

App.controller.Main = function($rootScope, model) {
	function passToScope(propName) {
		var that = this;
		return function(propValue) {
			that[propName] = propValue;
		};
	}

	function safeApply() {
		var scope = this;
		if (scope.$$phase !== '$apply')
			scope.$apply();
	}


	$rootScope.pass = passToScope;
	$rootScope.safeApply = safeApply;

	$rootScope.$on('WindowManager:ready', function() {
		$rootScope.$broadcast('WindowManager:openWindow', '/', model);
		setTimeout(function() {
			var path = '/Simulations/Generator and Processor/generator/';
			$rootScope.$broadcast('WindowManager:openWindow', path, model.at(path));
		}, 2000)
	});
};
