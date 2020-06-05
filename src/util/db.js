const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const usageDB = low(new FileSync('data/usage.json'));
const appNameDB = low(new FileSync('data/appName.json'));

/**
 *
 * @param {string} path
 */
export function getUsage(path) {
	return usageDB.get(path).value();
}

/**
 *
 * @param {string} path
 * @param value
 */
export function setUsage(path, value) {
	usageDB.set(path, value).write();
}

/**
 *
 * @param {string|string[]} path
 * @returns {string}
 */
export function getAppName(path) {
	return appNameDB.get(path).value();
}

/**
 *
 * @param {string|string[]} path
 * @param value
 */
export function setAppName(path, value) {
	appNameDB.set(path, value).write();
}
