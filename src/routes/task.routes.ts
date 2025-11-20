import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask
} from '../controllers/task.controller';

const router = express.Router();

// GET all tasks
router.get('/', getAllTasks);

// GET single task
router.get('/:id', getTaskById);

// POST create task
router.post('/', createTask);

// PATCH update task
router.patch('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

export default router;