import { WindowObserver } from './windowObserver';

const usageData = {};
let lastTitle: string;
let lastTime: number;

const windowObserver = new WindowObserver();

windowObserver.on('change', (title: string) => {
	const currentTime = Date.now();

	if (lastTitle) {
		usageData[lastTitle] += Math.round((currentTime - lastTime) / 1000);
	}

	if (!usageData.hasOwnProperty(title)) {
		usageData[title] = 0;
	}

	lastTitle = title;
	lastTime = currentTime;
	console.log(usageData);
});
