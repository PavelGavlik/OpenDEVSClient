'use strict';

clientApp.directive('uiAtomicExplorer', function() {
	function linkFn(scope, element, attrs, ctrl) {
	}

	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiAtomicExplorer.html',
		restrict: 'AE',
		link: linkFn
	};
});

var lastWin = null;
clientApp.directive('uiWindow', function() {
	return function(scope, element) {
		element.bind('click', function() {
			if (lastWin !== this)
				angular.element(lastWin).removeClass('active');
			angular.element(this).addClass('active');
			lastWin = this;
		});
	};
});