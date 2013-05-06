'use strict';

/** @extends {Scope} */
App.type.uiMethodEditor = {
	/** @type {function()} */
	acceptSource: null,
	/** @type {function()} */
	focus: null,
	loaded: false,
	/** @type {App.model.Method} */
	model: null,
	modified: false,
	currentSource: '',
	/** @type {function()} */
	revertSource: null
};

/**
 * @param {App.type.uiMethodEditor} $scope
 */
App.controller.uiMethodEditor = function($scope) {
	function originalSourceChanged(source) {
		if (source)
		{
			$scope.currentSource = $scope.model.source;
			$scope.modified = false;
		}
	}

	function currentSourceChanged(source) {
		if (source) {
			$scope.modified = source != $scope.model.source;
		}
	}

	function acceptSource() {
		$scope.modified = false;
		$scope.model.source = $scope.currentSource;
		$scope.$emit('uiMethodEditor:sourceChanged', $scope.model);
	}

	function revertSource() {
		$scope.modified = false;
		$scope.currentSource = $scope.model.source;
	}

	function focus() {
		$scope.$emit('uiMethodEditor:focus', $scope.model);
	}

	$scope.modified = false;

	$scope.$watch('model.source', originalSourceChanged);
	$scope.$watch('currentSource', currentSourceChanged);
	$scope.revertSource = revertSource;
	$scope.acceptSource = acceptSource;
	$scope.focus = focus;
};

App.directive.uiMethodEditor = function() {
	return {
		controller: App.controller.uiMethodEditor,
		link: function(scope, elm) {
			angular.element(elm).bind('click', scope.focus);
		},
		scope: { model: '=ngModel' },
		templateUrl: 'templates/directives/uiMethodEditor.html'
	};
};
