'use strict';

App.service.computeSubmodelSize = function() {
	return function computeSubmodelSize(svgRoot, submodel) {
		function getTextWidth(node, text) {
			node.textContent = text;
			return node.getBBox().width;
		}

		function getCollectionTextWidth(collection) {
			return collection.reduce(function(maxWidth, item) {
				return Math.max(maxWidth, getTextWidth(newText, item.name));
			}, 0);
		}

		// create fake text elements and save their widths
		var newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		svgRoot.appendChild(newText);

		var inputPortsWidth = getCollectionTextWidth(submodel.inputPorts);
		var outputPortsWidth = getCollectionTextWidth(submodel.outputPorts);
		newText.style.fontWeight = 'bold';
		var nameWidth = getTextWidth(newText, submodel.name);

		svgRoot.removeChild(newText);

		// compute final rectangle dimensions
		var size = {};
		var portsSize = inputPortsWidth + App.value.submodelPortGap + outputPortsWidth;
		if (nameWidth > portsSize)
			size.x = nameWidth + 6;
		else
			size.x = portsSize + 6;

		var portCount = Math.max(submodel.inputPorts.length, submodel.outputPorts.length);
		size.y = (portCount + 1) * App.value.submodelPortGap + 5;
		return size;
	}
};
