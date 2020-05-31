const activeWin = require('active-win');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// init lowdb
const adapter = new FileSync('data/usage.json');
const db = low(adapter);

let today = new Date().toDateString();

let usage = db.get(today).value() || {};
db.set(today, usage).write();

async function updateUsage() {
	const window = await activeWin();

	if (window) {
		const name = window.owner.name;

		if (usage[name]) {
			usage[name] += 1;
		} else {
			usage[name] = 1;
		}
		db.set(today, usage).write();
	}
}

setInterval(updateUsage, 1000);

export default usage;
