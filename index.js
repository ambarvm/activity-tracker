const { windowManager } = require('node-window-manager');
const path = require('path');

const usageData = {};
let lastTime = Date.now();
let previousName = path.basename(windowManager.getActiveWindow().path);

windowManager.addListener('window-activated', window => {
	const currentTime = Date.now();

	if (previousName) {
		if (usageData.hasOwnProperty(previousName)) {
			usageData[previousName] += Math.round((currentTime - lastTime) / 1000);
		} else {
			usageData[previousName] = 0;
		}
	}

	previousName = path.basename(window.path);
	lastTime = currentTime;
	console.log(usageData);
});
