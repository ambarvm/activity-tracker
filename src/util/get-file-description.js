import { exec } from 'child_process';

/**
 * Get description from file properties. Works only on windows
 * @param {string} path
 * @returns {Promise<string>}
 */
export function getFileDescription(path) {
	return new Promise((resolve, reject) => {
		exec(
			`(Get-ItemProperty "${path}").VersionInfo.FileDescription`,
			{ shell: 'powershell.exe' },
			(err, stdout, stderr) => {
				if (err || stderr) {
					reject(err);
				}
				resolve(stdout.trim());
			},
		);
	});
}
