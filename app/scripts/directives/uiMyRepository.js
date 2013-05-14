'use strict';

App.directive.uiMyRepository = function($compile, $http, $templateCache) {
	function linkFn(scope, element) {
		var tplUrl = 'templates/directives/uiMyRepository.html';
		$http.get(tplUrl, { cache: $templateCache }).success(function render(template) {
			// end recursion when reached item with no subitems
			if (!scope.val || !angular.isArray(scope.val.components))
				return;

			// needs explicit compiling because of tree structure
			element.append(template);
			$compile(element.contents())(scope.$new());

//			if (scope.selected)
//				console.log(scope.selected);

			scope.itemClicked = function(item) {
				scope.selected = item;
			}
		});
	}

	return {
		scope: {val:'=ngModel', itemDblClick: '=', selected: '='},
		link: linkFn
	};
};
