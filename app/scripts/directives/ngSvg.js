'use strict';

// clientApp.directive('ngSvg', function() {
// 	function linkFn(scope, element, attrs) {
// 	}

// 	return {
// 		controller: ['$transclude', '$element', function($transclude, $element) {
// 			// $transclude(function(clone) {
// 				var svg = angular.element(document.createElementNS(svgns, 'svg'));
// 				svg.attr('xmlns', svgns);
// 				// svg.append(clone);
// 				svg.html('<path ng-repeat="c in data.couplings" ui-coupled-submodel-coupling="" ng-model="c" style="stroke: black; fill: none;" d="M459 41 L485.5 58.5 Q 512 76 480.40025972126637 79.15537863283926 L480.40025972126637 79.15537863283926 L292.22586011014107 97.94545331519032 Q 274.64465515483 99.7010170624307 273.82232757741497 117.35050853121535 L273.82232757741497 117.35050853121535 L273.4111637887075 126.17525426560768 Q 273 135 279.80590922104665 140.63247659672828 L302 159"></path>');
// 				$element[0].innerHTML = '';
// 				$element.append(svg);
// 			// });
// 		}],
// 		terminal: true,
// 		// transclude: true,
// 		restrict: 'E'
// 	};
// });
// 
clientApp.directive('ngSvg', function() {
	return {
		// restrict: 'E',
		terminal: true,
		link: function(scope, element) {
			var parent = element[0];
			var svgRoot = element.find('svg')[0];
			parent.removeChild(svgRoot);
			// var svgRoot = document.createElementNS(svgns, 'svg');
			// // svgRoot.setAttribute('xmlns', svgns);
			// svgRoot.setAttribute('width', 300);
			// svgRoot.setAttribute('height', 300);
			// // svgRoot.appendChild(oldSvgRoot.childNodes[1]);

			// svgRoot.addEventListener('SVGLoad', function() {console.log('loaded');
			// 	var circle = document.createElementNS(svgns, 'circle');
			// 	circle.setAttribute('x', 20);
			// 	circle.setAttribute('y', 20);
			// 	circle.setAttribute('r', 5);
			// 	circle.setAttribute('fill', 'red');
			// 	this.appendChild(circle);
			// 	this.appendChild(oldSvgRoot.childNodes[0])
			// });
			

			alert(svgRoot.nodeName);
			window.svgweb.appendChild(svgRoot, parent);

			// var svgScript = document.createElement('script');
			// svgScript.type = 'image/svg+xml';
			// svgScript.text = svgRoot.innerHTML;

			// window.svgweb._svgScripts.push(svgScript);
			// element[0].appendChild(svgScript);

			// preserve our SVGLoad addEventListeners on the script object
			// svgScript._onloadListeners = svgRoot._detachedListeners /* flash renderer */
			//                                 || svgRoot._onloadListeners /* native */;

			// window.svgweb._processSVGScript(svgScript);
			// } else {
			//   element[0].appendChild(svgRoot);
			// }
		}
	};
});

angular.forEach(['x', 'y', 'd', 'width', 'height', 'transform'], function(name) {
	var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
	clientApp.directive(ngName, function() {
		return function(scope, element, attrs) {
			attrs.$observe(ngName, function(value) {
				attrs.$set(name, value);
			});
		};
	});
});
