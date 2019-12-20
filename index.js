const { windowManager } = require('node-window-manager');
const path = require('path');

const usageData = {};

let lastTime = Date.now();
let previousName = path.basename(windowManager.getActiveWindow().path);

usageData[previousName] = 0;

windowManager.addListener('window-activated', window => {
	const currentTime = Date.now();
	const currentName = path.basename(window.path);

	usageData[previousName] += Math.round((currentTime - lastTime) / 1000);

	if (!usageData.hasOwnProperty(currentName)) {
		usageData[currentName] = 0;
	}

	previousName = path.basename(window.path);
	lastTime = currentTime;
	console.log(usageData);
});
