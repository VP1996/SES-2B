const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectdb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('mongo db connected');
	} catch (err) {
		console.log('failed' + err);
		// exit process with fail
		process.exit(1);
	}
};

module.exports = connectdb;
