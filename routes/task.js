const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

router.post("/todos", taskController.addTask);

router.get("/todos", taskController.getTasks);

router.put("/todos/:taskId", taskController.updateTask);

router.patch("/todos/:taskId", taskController.markasComplete);

router.delete("/todos/:taskId", taskController.deleteTask);

module.exports = router;

