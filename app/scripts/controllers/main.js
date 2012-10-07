'use strict';

clientApp.controller('MainCtrl', ['$scope', function($scope) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Testacular'
	];
	$scope.simulations = {
		components: [
			{
				name: 'Cart-Pole-Control System',
				components: [
					{name: 'dscds'},
					{name: 'dcsdc'}
				]
			},
			{
				name: 'Generator and Processor'
			},
			{
				name: 'Generator and Processor 2',
				components: [
					{name: 'dscds'},
					{
						name: 'gwcw',
						components: [
							{name: 'cds'},
							{name: 'gtrg cmdosic mdskc mdskc mdskcmds kcmdsk cmdskc'}
						]
					}
				]
			}
		]
	};
}]);
