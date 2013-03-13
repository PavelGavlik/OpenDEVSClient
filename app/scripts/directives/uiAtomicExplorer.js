'use strict';

App.directive.uiAtomicExplorer = function() {
	function linkFn(scope, element, attrs, ctrl) {
	}

	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiAtomicExplorer.html',
		restrict: 'AE',
		link: linkFn
	};
};
