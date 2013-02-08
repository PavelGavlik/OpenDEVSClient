'use strict';

clientApp.directive('uiCoupledExplorer', function() {
	function linkFn(scope, element, attrs, ctrl) {
	}

	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiCoupledExplorer.html',
		restrict: 'AE',
		link: linkFn
	};
});
