import * as carlo from 'carlo';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from 'path';
import { WindowObserver } from './WindowObserver';
import { ChartData } from './interfaces';

const adapter = new FileSync('database/usage.json');
const db = low(adapter);

let lastTitle: string;
let lastTime: number;

const windowObserver = new WindowObserver();

windowObserver.on('change', (title: string) => {
	const date = new Date().toDateString();
	const currentTime = Date.now();

	if (lastTitle) {
		const delta = Math.round((currentTime - lastTime) / 1000);
		db.update([date, lastTitle], x => x + delta).write();
	}

	if (!db.has([date, title])) {
		db.set([date, title], 0).write();
	}

	lastTitle = title;
	lastTime = currentTime;
});

const getUsage = (date: string): ChartData[] => {
	const data = db.get(date).value();
	const result = [];

	for (const appName in data) {
		if (data.hasOwnProperty(appName)) {
			result.push({
				name: appName,
				seconds: data[appName],
			});
		}
	}

	return result;
};

const startApp = async () => {
	// Launch the browser.
	const app = await carlo.launch();

	// Terminate Node.js process on app window closing.
	app.on('exit', () => process.exit());

	// Tell carlo where your web files are located.
	app.serveFolder(path.resolve(__dirname, 'public'));

	await app.exposeFunction('getUsage', getUsage);

	// Navigate to the main page of your app.
	await app.load('index.html');
};

startApp();
