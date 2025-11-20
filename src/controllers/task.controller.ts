import { Request, Response } from 'express';
import Task from '../models/task.modal';

// GET all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// GET single task
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
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
};

// POST create task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// PATCH update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
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
};

// DELETE task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
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
};
