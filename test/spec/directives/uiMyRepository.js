'use strict';

describe('Directive: uiMyRepository', function() {
	var element, $scope, $compile, $httpBackend;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiMyRepository.html'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	function build() {
		element = angular.element('<div ui-my-repository ng-model="tree" />');
		$compile(element)($scope);
		$scope.$digest();
	}

	it('should compile', function() {
		$scope.tree = {};
		build();
	});

	it('should fill tree from data', function() {
		$scope.tree = {components: [{name: 'aa'}, {name: 'bb'}]};
		build();
		expect(element.find('li').length).toEqual(2);
	});

	it('should select item when clicked', function() {
		$scope.tree = {components: [{name: 'aa'}, {name: 'bb'}]};
		$scope.selected = $scope.tree.components[0];
		build();
		expect(element.find('li').eq(0).hasClass('selected')).toBeTruthy();
	});
});
