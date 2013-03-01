'use strict';

clientApp.controller('MainCtrl', ['$rootScope', '$routeParams', 'api', function($scope, $routeParams, api) {
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

	function openItemFromEvent(e, itemName) {
		function makeHash(itemName, tree, hash) {
			if (tree.name)
				hash[tree.name] = tree;
			if (tree.components)
				tree.components.forEach(function(item) {
					makeHash(itemName, item, hash);
				});
			return hash;
		}
		var item = makeHash(itemName, $scope.simulations, [])[itemName];
		$scope.openItem(item);
		$scope.$apply();
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
	$scope.$on('MyRepository:ready', function() {
		$scope.$emit('openWindow', $routeParams.name);
	});

	api.simulations()
	.success(function() {
		setTimeout($scope.$broadcast.bind($scope, 'MyRepository:ready'), 1000);
	})
	.success($scope.pass('simulations'))
	.error(function() {
		window.alert('Unable to load MyRepository.');
	});
}]);