'use strict';

/** @extends {Scope} */
App.type.WindowManagerScope = {
	/** @type {function(model)} */
	closeWindow: null,
	currentWindowName: '',
	/** @type {function(path, model)} */
	openWindow: null,
	/** @type {function(window)} */
	selectWindow: null,
	windows: []
};

/**
 *
 * @param {App.type.WindowManagerScope} $scope
 * @constructor
 */
App.controller.WindowManager = function($scope) {
	function openWindow(path, model) {
		/**
		 *
		 * @param {App.model.MyRepository} win
		 * @returns {boolean}
		 */
		function isNotSameWindow(win) {
			var isNotSame = win.path !== path;
			if (!isNotSame)
				$scope.selectWindow(win);
			return isNotSame;
		}

		if ($scope.windows.every(isNotSameWindow)) {
			$scope.windows.push(model);
			$scope.selectWindow(model);
			Util.safeApply($scope);
		}
	}

	function selectWindow(model) {
		$scope.currentWindowName = model.path;
		Util.safeApply($scope);
	}

	function closeWindow(model) {
		Util.removeArrayItem($scope.windows, model);
		$scope.selectWindow(Util.lastArrayItem($scope.windows));
		Util.safeApply($scope);
	}

	function openWindowFromEvent(e, path, model) {
		openWindow(path, model);
	}

	function selectWindowFromEvent(e, model) {
		selectWindow(model);
	}

	function closeWindowFromEvent(e, model) {
		closeWindow(model);
	}


	$scope.windows = [];
	$scope.currentWindowName = '';

	$scope.openWindow = openWindow;
	$scope.selectWindow = selectWindow;
	$scope.closeWindow = closeWindow;

	$scope.$on('WindowManager:openWindow', openWindowFromEvent);
	$scope.$on('WindowManager:selectWindow', selectWindowFromEvent);
	$scope.$on('WindowManager:closeWindow', closeWindowFromEvent);
	$scope.$emit('WindowManager:ready');
};

App.directive.uiWindow = function() {
	function linkFn(scope, element) {
		var type = scope.model.type;
		if (type == 'MyRepository')
			scope.tpl = 'templates/windows/myRepository.html';
		if (type == 'coupled' || type == 'simulation')
			scope.tpl = 'templates/windows/coupled.html';
		else if (type == 'atomic')
			scope.tpl = 'templates/windows/atomic.html';

		element.addClass(type);
		element.bind('click', function() {
			scope.$emit('WindowManager:selectWindow', scope.model);
		});
	}

	return {
		link: linkFn,
		scope: {model: '=ngModel'},
		template: '<div ng-include="tpl"></div>'
	};
};

App.controller.MyRepositoryItemCtrl = function($scope, api, model) {
	api.MyRepository($scope.model.path).
		success(function(item) {
			$scope.model = model.put($scope.model.path, item);
		}).
		error(function() {
			window.alert('Unable to load item from server.');
		});

	function openWindow(model) {
		$scope.$emit('WindowManager:openWindow', model.path, model);
	}

	function closeWindow(model) {
		$scope.$emit('WindowManager:closeWindow', model);
	}

	function deleteItem() {
//		api.MyRepository($scope.model.path).delete()
		closeWindow($scope.model);
	}

	$scope.openWindow = openWindow;
	$scope.closeWindow = closeWindow;
	$scope.deleteItem = deleteItem;
};
