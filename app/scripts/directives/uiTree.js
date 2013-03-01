'use strict';

clientApp
.directive('uiTree', function($compile) {
	function linkFn(scope, element) {
		if (!scope.val || !angular.isArray(scope.val.components))
			return;
		
		// needs explicit compiling because of tree structure
		element.append('<ul class="nav nav-list">' +
			'<h2 ng-show="title">{{title}}</h2>' +
			'<li ng-repeat="item in val.components" ng-class="{closed: !this[$index], end: !item.components.length}">' +
			'<a ng-click="this[$index] = !this[$index]" ng-dblclick="itemDblclick(item)"><span>{{item.name}}</span></a>' +
			'<div ui-tree ng-model="item" item-dblclick="itemDblclick"></div></li></ul>');
		$compile(element.contents())(scope.$new());
	}

	return {
		restrict: 'AE',
		scope: {val:'=ngModel', itemDblclick: '=', title: '@'},
		link: linkFn
	};
});