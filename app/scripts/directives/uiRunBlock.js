'use strict';

App.directive.uiRunBlock = function() {
	return {
		scope: {data: '=ngModel'},
		templateUrl: 'templates/directives/uiRunBlock.html'
	};
};
