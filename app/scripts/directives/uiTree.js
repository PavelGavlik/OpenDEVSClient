'use strict';

App.directive.uiTreeItem = function() {
	return {
		link: function(scope, element, attrs) {
			scope.closed = 'closed' in attrs;
		},
		scope: { name: '@title', modelName: '=ngModel' },
		templateUrl: 'templates/directives/uiTree.html',
		transclude: true
	};
};