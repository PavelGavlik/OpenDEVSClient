'use strict';

describe('Directive: uiTree', function() {
	var element, $scope, $compile, $httpBackend;

	beforeEach(module('clientApp'));
	beforeEach(module('templates/directives/uiTree.html'));
	beforeEach(inject(['$rootScope', '$compile', '$httpBackend', '$templateCache', function($r, $c, $h, $templateCache) {
		$scope = $r;
		$compile = $c;
		$httpBackend = $h;

		var template = $templateCache.get('templates/directives/uiTree.html');
		$httpBackend.when('GET', '/templates/directives/uiTree.html').respond(template);
	}]));

	function build() {
		element = angular.element('<div ui-tree ng-model="tree" />');
		$compile(element)($scope);
		$scope.$digest();
		$httpBackend.flush();
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
});
