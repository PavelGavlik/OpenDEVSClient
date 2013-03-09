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

var lastWin = null;
App.directive.uiWindow = function() {
	return function(scope, element) {
		function raiseWindow() {
			if (lastWin !== element)
				angular.element(lastWin).removeClass('active');
			angular.element(element).addClass('active');
			lastWin = element;
		}
		element.bind('click', raiseWindow);
		setTimeout(raiseWindow, 0);
	};
};