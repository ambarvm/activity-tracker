import * as db from './db';
import { getFileDescription } from './get-file-description';
const activeWin = require('active-win');

let today = new Date().toDateString().slice(4);

let usage = db.getUsage(today) || {};
db.setUsage(today, usage);

async function updateUsage() {
	const window = await activeWin();

	if (window) {
		// TODO: Map filename to application name on windows
		let appName = window.owner.name;

		if (process.platform === 'win32') {
			appName = db.getAppName([window.owner.path]);

			if (!appName) {
				appName =
					(await getFileDescription(window.owner.path)) || window.owner.name;

				db.setAppName([window.owner.path], appName);
			}
		}

		if (usage[appName]) {
			usage[appName] += 1;
		} else {
			usage[appName] = 1;
		}
		db.setUsage(today, usage);
	}
}

/**
 * Start tracking usage data
 */
export function trackUsage() {
	setInterval(updateUsage, 1000);
}
