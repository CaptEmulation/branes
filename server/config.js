module.exports = {
	mongodb: {
		uri: 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE
	}
};