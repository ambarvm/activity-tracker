import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { WindowObserver } from './WindowObserver';

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
