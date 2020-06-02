/**
 * Convert date to YYYY-MM-DD format string.
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd/23593099#23593099
 * @param {(Date|string)} date
 */
export function toYYYYMMDD(date) {
	const d = new Date(date);
	let month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
