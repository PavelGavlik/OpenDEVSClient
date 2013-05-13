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

var i = 0;

App.controller.MyRepositoryItem = function($scope, $window, $element, $timeout, api, model) {
	function openWindow(model) {
		$scope.$emit('WindowManager:openWindow', model.path, model);
	}

	function refreshWindow() {
		var modelResource = new api.MyRepositoryItem($scope.model);
		modelResource.get()
			.success(function (item) {
				$scope.model = model.put($scope.model.path, item);
//				if (item && item.name != 'Root' && item.type != 'MyRepository' &&
//					$scope.model.rootSolver && $scope.model.rootSolver().running)
//					$timeout(refreshWindow, 1000);
			})
			.error(function () {
				$window.alert('Unable to load item from server.');
			});

	}

	function selectWindow() {
		$scope.$emit('WindowManager:selectWindow', $scope.model);
	}

	function closeWindow(model) {
		$scope.$emit('WindowManager:closeWindow', model);
	}

	function setWindowTemplate(type) {
		if (type == 'simulation')
			type = 'coupled';
		$scope.tpl = 'templates/windows/'+ type +'.html';
		$element.addClass(type);
	}

	function setWindowPosition() {
		if (i == 0) {
			$element.parent().addClass('root');
		}
		else {
			$element[0].style.left = i * 20 + 'px';
			$element[0].style.top = i * 28 - 8 + 'px';
		}
		$element[0].style.zIndex = i;
		i++;
	}

	$scope.openWindow = openWindow;
	$scope.refreshWindow = refreshWindow;
	$scope.selectWindow = selectWindow;
	$scope.closeWindow = closeWindow;

	refreshWindow();
	setWindowTemplate($scope.model.type);
	setWindowPosition();

	$element.bind('click', selectWindow);
};

App.directive.uiWindow = function() {
	return {
		controller: App.controller.MyRepositoryItem,
		scope: {model: '=ngModel'},
		template: '<div ng-include="tpl"></div>'
	};
};
