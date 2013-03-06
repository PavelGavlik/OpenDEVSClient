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

	xit('should fire event handler when item clicked');
});
