'use strict';

// Declare app level module
var clientApp = angular.module('clientApp', ['templates-main', 'ui']);

clientApp.controller(App.controller);
clientApp.directive(App.directive);
clientApp.factory(App.service);
clientApp.factory('model', function() {
	return new App.model.MyRepository();
});

clientApp.value('ui.config', {
	codemirror: {
		mode: 'smalltalk',
		lineNumbers: true,
		lineWrapping: true,
		closeBrackets: true,
		matchBrackets: true
	}
});
