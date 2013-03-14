'use strict';

App.controller.WindowManager = function($scope) {
	function openWindow(path, model) {
		function isNotSameWindow(window) {
			var isNotSame = window.path !== path;
			if (!isNotSame)
				$scope.selectWindow(window);
			return isNotSame;
		}

		if ($scope.windows.every(isNotSameWindow)) {
			$scope.windows.push(model);
			$scope.selectWindow(model);
			$scope.safeApply();
		}
	}

	function selectWindow(model) {
		$scope.currentWindowName = model.path;
		$scope.safeApply();
	}

	function closeWindow(model) {
		/**
		 * Removes specific item from array
		 * @param {Array} arr
		 * @param {*} item
		 */
		function removeArrayItem(arr, item) {
			arr.splice(arr.indexOf(item), 1);
		}

		/**
		 * Return last item of given array
		 * @param {Array} arr
		 * @returns {*}
		 */
		function lastArrayItem(arr) {
			return arr[arr.length - 1];
		}
		removeArrayItem($scope.windows, model);
		$scope.selectWindow(lastArrayItem($scope.windows));
		$scope.safeApply();
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
			window.alert('Unable to load MyRepository.');
		});

	$scope.openWindow = function(model) {
		$scope.$emit('WindowManager:openWindow', model.path, model);
	}

	$scope.closeWindow = function(model) {
		$scope.$emit('WindowManager:closeWindow', model);
	}
};
