'use strict';

describe('Controller: uiMethodEditor', function() {
	var $scope, spy
		;

	beforeEach(module('clientApp'));

	beforeEach(inject(['$controller', '$rootScope', 'api', function($controller, $rootScope) {
		$scope = $rootScope;
		$scope.model = new App.model.Method({source: 'aa'}, new App.model.AtomicDEVSPrototype());

		$controller('uiMethodEditor', {
			$scope: $scope,
			$window: $window
		});
		$scope.$digest();

		spy = jasmine.createSpy();
		$scope.$on('uiMethodEditor:sourceChanged', spy);
	}]));

	it('should copy original source to temp source', function() {
		expect($scope.currentSource).toBe('aa');
	});

	it('should be able to revert to original source', function() {
		$scope.currentSource = 'bb';
		$scope.$digest();
		expect($scope.modified).toBeTruthy();
		$scope.revertSource();
		expect($scope.currentSource).toBe('aa');
	});

	it('should be able to accept modified source', function() {
		$scope.currentSource = 'cc';
		$scope.$digest();
		$scope.acceptSource();
		expect($scope.model.source).toBe('cc');
		expect($scope.modified).toBeFalsy();
		expect(spy).toHaveBeenCalled();
	});

	it('should emit event when focused', function() {
		var spy = jasmine.createSpy();
		$scope.$on('uiMethodEditor:focus', spy);
		$scope.focus();
		expect(spy).toHaveBeenCalled();
	})
});

describe('Directive: uiMethodEditor', function() {
	var element, $scope, $compile;

	beforeEach(module('clientApp'));
	beforeEach(inject(['$rootScope', '$compile', function($r, $c) {
		$scope = $r;
		$compile = $c;
	}]));

	it('should compile', function() {
		element = angular.element('<div ui-method-editor />');
		element = $compile(element)($scope);
		$scope.$digest();
	});
});
