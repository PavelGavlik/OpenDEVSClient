'use strict';

clientApp.directive('uiTree', function($compile, $http, $templateCache) {
	function linkFn(scope, element) {
		$http.get('/templates/directives/uiTree.html',
		{ cache: $templateCache }).success(function(template) {
			// end recursion when reached item with no subitems
			if (!scope.val || !angular.isArray(scope.val.components))
				return;
			
			// needs explicit compiling because of tree structure
			element.append(template);
			$compile(element.contents())(scope.$new());
		});


	}

	return {
		restrict: 'AE',
		scope: {val:'=ngModel', itemDblclick: '=', title: '@'},
		link: linkFn
	};
});