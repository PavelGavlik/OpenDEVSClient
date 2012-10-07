'use strict';

clientApp
.directive('uiTree', function($compile) {
	return {
		scope: {val:'=ngModel', title: '@'},
		link: function(scope, element) {
			if (!angular.isArray(scope.val.components))
				return;
			
			element.append('<ul class="nav nav-list">' +
				'<li ng-show="title" class="nav-header">{{title}}</li>' +
				'<li ng-repeat="item in val.components" ng-class="{closed: !this[$index], end: !item.components.length}">' +
					'<a ng-click="this[$index] = !this[$index]"><span>{{item.name}}</span></a>' +
					'<div ui-tree ng-model="item"></div></li></ul>');
			$compile(element.contents())(scope.$new());
		}
	};
});
