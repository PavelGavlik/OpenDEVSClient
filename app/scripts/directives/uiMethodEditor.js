'use strict';

App.controller.uiMethodEditor = function($scope) {
	function sourceChanged(source) {
		if (source)
			if (loaded)
				$scope.modified = true;
			else {
				loaded = true;
			}
	}

	function revertSource() {
		$scope.modified = false;
	}

	$scope.modified = false;
	var loaded = false;

	$scope.$watch('model', sourceChanged);
	$scope.revertSource = revertSource;
};

App.directive.uiMethodEditor = function() {
	return {
		controller: App.controller.uiMethodEditor,
		scope: { model: '=ngModel' },
		templateUrl: 'templates/directives/uiMethodEditor.html'
	};
};
