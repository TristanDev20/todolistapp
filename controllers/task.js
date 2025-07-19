const Task = require('../models/Task');
const {errorHandler} = require('../errorHandler');
const mongoose = require('mongoose');

module.exports.addTask = (req, res) => {
	if(!req.body.name || !req.body.details) {
		return res.status(400).send({ message: 'name and details are required'});
	}

	Task.findOne({ name: req.body.name }).then(existingTask => {
		if(existingTask) {
			return res.status(409).send({ message: 'Task already exists' });
		}

		const newTask = new Task({
			name: req.body.name,
			details: req.body.details
		});

		return newTask.save()
		 .then(result => {
		 	res.status(201).send({ 
		 		message: 'Added Task Successfully ',
		 		task: result
		 	});
		 })
		 .catch(error => errorHandler(error, req, res));
	}).catch(error => errorHandler(error, req, res));
};

module.exports.getTasks = (req, res) => {
	return Task.find({})
	 .then(tasks => {
	 	res.status(200).send(tasks);
	 })
	 .catch(error => errorHandler(error, req, res));
};

module.exports.updateTask = (req, res) => {
	const taskId = req.params.taskId;

	if(!mongoose.Types.ObjectId.isValid(taskId)) {
		return res.status(400).send({ message: 'Invalid task ID' });
	}

	Task.findById(taskId)
		.then(task => {
			if(!task) { 
				return res.stats(404).send({ message: 'No Task found'});
			}

			task.name = req.body.name;
			task.details = req.body.details;

		return task.save()
		.then(updatedTask => {
			return res.status(200).send({
				message: 'Task updated Successfully',
				task: updatedTask
			});
		}).catch(error => errorHandler(error, req, res));	
		}).catch(error => errorHandler(error, req, res));
};


module.exports.deleteTask = (req, res) => {
	const taskId = req.params.taskId;

	if(!mongoose.Types.ObjectId.isValid(taskId)) {
		return res.status(400).send({ message: 'Invalid task ID'});
	}

	Task.findByIdAndDelete(taskId)
		.then(result => {
			if(!result) {
				return res.status(404).send({ message: 'Task not found'});
			}
			return res.status(200).send({ message: 'Task deleted Successfully '});
		}).catch(error => errorHandler(error,req,res));
};

module.exports.markasComplete = (req, res) => {
	const taskId = req.params.taskId;

	if(!mongoose.Types.ObjectId.isValid(taskId)) {
		return res.status(400).send({ message: 'Invalid task ID' });
	}

	Task.findById(taskId)
		.then(task => {
			if(!task) { 
				return res.stats(404).send({ message: 'No Task found'});
			}

			task.status = 'completed';

		return task.save()
		.then(updatedTask => {
			return res.status(200).send({
				message: 'Task mark as complete Successfully',
				task: updatedTask
			});
		}).catch(error => errorHandler(error, req, res));	
		}).catch(error => errorHandler(error, req, res));
};