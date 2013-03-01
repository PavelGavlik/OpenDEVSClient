'use strict';

clientApp.directive('uiRunBlock', function() {
	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiRunBlock.html'
	};
});
