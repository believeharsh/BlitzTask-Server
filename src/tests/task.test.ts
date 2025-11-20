import request from 'supertest';
import express from 'express';
import taskRoutes from '../routes/task.routes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task API Endpoints', () => {
  
  test('GET /api/tasks should return all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/tasks should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending'
    };
    
    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
  });

  test('POST /api/tasks without title should fail', async () => {
    const invalidTask = {
      description: 'No title provided'
    };
    
    const response = await request(app)
      .post('/api/tasks')
      .send(invalidTask);
    
    expect(response.status).toBe(400);
  });
});