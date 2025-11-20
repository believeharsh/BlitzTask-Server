import express, { Request, Response } from 'express';
import Task from '../models/task.modal';

const router = express.Router();

// GET all tasks
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET single task
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST create task
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// PATCH update task
router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;