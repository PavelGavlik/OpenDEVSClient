'use strict';

clientApp.controller('MainCtrl', ['$scope', 'api', function($scope, api) {
	function openItem(newItem) {
		function isNotSameItem(item) {
			var isNotSame = item.name !== newItem.name;
			if (!isNotSame)
				$scope.selectItem(item);
			return isNotSame;
		}

		if ($scope.items.every(isNotSameItem)) {
			$scope.items.push(newItem);
			$scope.currentItemName = newItem.name;
		}
	}

	function openItemFromEvent(e, window) {
		$scope.openItem(window);
	}

	function selectItem(item) {
		$scope.currentItemName = item.name;
	}

	function passToScope(propName) {
		var that = this;
		return function(propValue) {
			that[propName] = propValue;
		};
	}


	$scope.simulations = {components: []};
	$scope.items = [];
	$scope.currentItemName = '';

	$scope.openItem = openItem;
	$scope.selectItem = selectItem;
	$scope.pass = passToScope;

	$scope.$on('openWindow', openItemFromEvent);
	api.simulations().success($scope.pass('simulations'));
}]);
