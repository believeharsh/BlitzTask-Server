import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import './config/database';
import dotenv from 'dotenv';
import { keepAlive } from './services/keepAlive';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  const url = 'https://blitztask-server.onrender.com';
  keepAlive(url);
}


// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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