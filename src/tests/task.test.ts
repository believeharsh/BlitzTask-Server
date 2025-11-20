import request from 'supertest';
import express from 'express';
import taskRoutes from '../routes/task.routes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task API Endpoints', () => {
  
  // Test 1: Get all tasks
  test('GET /api/tasks should return all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test 2: Create a new task
  test('POST /api/tasks should create a new task', async () => {
    const newTask = {
      title: 'Test Task from Jest',
      description: 'This is a test task created by automated testing',
      status: 'pending'
    };
    
    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.status).toBe('pending');
  });

  // Test 3: Create task without title should fail
  test('POST /api/tasks without title should fail', async () => {
    const invalidTask = {
      description: 'No title provided'
    };
    
    const response = await request(app)
      .post('/api/tasks')
      .send(invalidTask);
    
    expect(response.status).toBe(400);
  });

  // Test 4: Update a task
  test('PATCH /api/tasks/:id should update task status', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Update',
        description: 'Will be updated',
        status: 'pending'
      });

    const taskId = createResponse.body.id;

    // Now update it
    const updateResponse = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'completed' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe('completed');
  });

  // Test 5: Delete a task
  test('DELETE /api/tasks/:id should delete a task', async () => {
    // First create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Delete',
        status: 'pending'
      });

    const taskId = createResponse.body.id;

    // Now delete it
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Task deleted successfully');
  });

  // Test 6: Get non-existent task should return 404
  test('GET /api/tasks/:id with invalid ID should return 404', async () => {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app).get(`/api/tasks/${fakeId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found');
  });
});