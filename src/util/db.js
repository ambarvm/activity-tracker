const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/usage.json');
const db = low(adapter);

/**
 *
 * @param {string} path
 */
export function get(path) {
	return db.get(path).value();
}

/**
 *
 * @param {string} path
 * @param value
 */
export function set(path, value) {
	db.set(path, value).write();
}
