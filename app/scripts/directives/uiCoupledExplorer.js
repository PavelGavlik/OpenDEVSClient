'use strict';

clientApp.directive('uiCoupledExplorer', function() {
	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiCoupledExplorer.html',
		restrict: 'AE'
	};
});
