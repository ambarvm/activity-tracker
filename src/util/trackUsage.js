import * as db from './db';
const activeWin = require('active-win');

let today = new Date().toDateString().slice(4);

let usage = db.get(today) || {};
db.set(today, usage);

async function updateUsage() {
	const window = await activeWin();

	if (window) {
		const name = window.owner.name;

		if (usage[name]) {
			usage[name] += 1;
		} else {
			usage[name] = 1;
		}
		db.set(today, usage);
	}
}

/**
 * Start tracking usage data
 */
function trackUsage() {
	setInterval(updateUsage, 1000);
}

export default trackUsage;
