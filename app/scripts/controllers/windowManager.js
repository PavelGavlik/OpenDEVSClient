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

App.controller.MyRepositoryItem = function($scope, $window, $element, api, model) {
	function openWindow(model) {
		$scope.$emit('WindowManager:openWindow', model.path, model);
	}

	function refreshWindow() {
		$scope.modelResource.get()
			.success(function (item) {
				$scope.model = model.put($scope.model.path, item);
			})
			.error(function () {
				$window.alert('Unable to load item from server.');
			});
	}

	function closeWindow(model) {
		$scope.$emit('WindowManager:closeWindow', model);
	}

	function setWindowTemplate(type) {
		if (type == 'simulation')
			type = 'coupled';
		$scope.tpl = 'templates/windows/'+ type +'.html';
	}

	$scope.modelResource = $scope.modelResource || new api.MyRepository($scope.model.path);
	$scope.openWindow = openWindow;
	$scope.refreshWindow = refreshWindow;
	$scope.closeWindow = closeWindow;

	var type = $scope.model.type;
	refreshWindow();
	setWindowTemplate(type);
	$element.addClass(type);
	if (i == 0) {
		$element.parent().addClass('root');
	}
	else {
		$element[0].style.left = i * 20 + 'px';
		$element[0].style.top = i * 28 - 8 + 'px';
	}
	$element[0].style.zIndex = i;
	i++;
	var initX, initY;
	$element.bind('dragstart', function(e) {
		console.log(e);
		initX = e.screenX;
		initY = e.screenY;
		e.dataTransfer.setData('a', 'b');
		e.dataTransfer.dropEffect = 'none';
	});
	$element.bind('dragend', function(e) {
		console.log(e);
		var compStyle = document.defaultView.getComputedStyle($element[0]);
		$element[0].style.left = parseInt(compStyle.left, 10) + e.screenX - initX + 'px';
		$element[0].style.top = parseInt(compStyle.top, 10) + e.screenY - initY + 'px';
	});
	$element.bind('click', function() {
		$scope.$emit('WindowManager:selectWindow', $scope.model);
	});
};

App.directive.uiWindow = function() {
	return {
		controller: App.controller.MyRepositoryItem,
		scope: {model: '=ngModel'},
		template: '<div ng-include="tpl"></div>'
	};
};
