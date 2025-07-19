const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'name is Required']
	},
	details: {
		type: String,
		required: [true, 'Details is Required']
	},
	status: {
		type: String,
		default: 'active'
	}
});

module.exports = mongoose.model('Task', taskSchema);