
const isPro = require('process').env.NODE_ENV === 'production' ? true : false;
module.exports = {
	port: isPro ? 80 : 3000,
	isPro
}