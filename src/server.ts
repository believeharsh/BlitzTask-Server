import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import './config/database';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});