'use strict';

angular.forEach(['x', 'y', 'd', 'width', 'height', 'transform'], function(name) {
	var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
	clientApp.directive(ngName, function() {
		return function(scope, element, attrs) {
			attrs.$observe(ngName, function(value) {
				attrs.$set(name, value);
			});
		};
	});
});
