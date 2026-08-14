const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 1. CREATE Task (POST /api/tasks)
router.post('/', async (req, res, next) => {
  try {
    const { title, description, isCompleted, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
    const task = await Task.create({ title, description, isCompleted, dueDate });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// 2. READ ALL Tasks with filtering (GET /api/tasks)
router.get('/', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.completed !== undefined) {
      query.isCompleted = req.query.completed === 'true';
    }
    const tasks = await Task.find(query);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
});

// 3. READ SINGLE Task by ID (GET /api/tasks/:id)
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// 4. UPDATE Task by ID (PUT /api/tasks/:id)
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// 5. DELETE Task by ID (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;