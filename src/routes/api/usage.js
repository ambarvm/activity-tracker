import * as db from '../../util/db';
import polka from 'polka';

/**
 *
 * @param {polka.Request} req
 * @param res
 */
export function get(req, res) {
	const date = new Date(req.query['date']).toDateString().slice(4);

	const usage = db.get(date);

	res.writeHead(200, {
		'Content-Type': 'application/json',
	});
	res.end(JSON.stringify(usage));
}
