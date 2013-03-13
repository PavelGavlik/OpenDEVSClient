'use strict';

App.controller.WindowManager = function($scope) {
	function openWindow(path, model) {
		function isNotSameItem(item) {
			var isNotSame = item.path !== path;
			if (!isNotSame)
				$scope.selectWindow(item);
			return isNotSame;
		}

		if ($scope.items.every(isNotSameItem)) {
			$scope.items.push(model);
			$scope.currentItemName = path;
		}
	}

	function selectWindow(model) {
		$scope.currentItemName = model.path;
		$scope.safeApply();
	}

	function openWindowFromEvent(e, path, model) {
		openWindow(path, model);
	}

	function selectWindowFromEvent(e, model) {
		selectWindow(model);
	}


	$scope.items = [];
	$scope.currentItemName = '';

	$scope.openWindow = openWindow;
	$scope.selectWindow = selectWindow;

	$scope.$on('WindowManager:openWindow', openWindowFromEvent);
	$scope.$on('WindowManager:selectWindow', selectWindowFromEvent);
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
};
