# Task Management API - Backend (TypeScript)

A RESTful API built with Node.js, Express.js, TypeScript, and PostgreSQL for managing tasks.

## Tech Stack
- **Node.js** & **Express.js** - Server framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database (via Supabase)
- **Sequelize** - ORM
- **Jest** & **Supertest** - Testing

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database → Connection String
4. Copy the URI connection string

### 3. Configure Environment
Create a `.env` file in the root:
```
PORT=5000
DATABASE_URL=your_supabase_connection_string
```

### 4. Run the Server
```bash
# Development mode (with hot reload)
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### 5. Run Tests
```bash
npm test
```

## API Endpoints

### Get All Tasks
```
GET /api/tasks
```

### Get Single Task
```
GET /api/tasks/:id
```

### Create Task
```
POST /api/tasks
Body: {
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```

### Update Task
```
PATCH /api/tasks/:id
Body: {
  "status": "completed"
}
```

### Delete Task
```
DELETE /api/tasks/:id
```

## Project Structure
```
taskapp-backend/
├── src/
│   ├── config/
│   │   └── database.ts      # Sequelize configuration
│   ├── models/
│   │   └── Task.ts          # Task model with types
│   ├── routes/
│   │   └── taskRoutes.ts    # API routes
│   └── server.ts            # Entry point
├── tests/
│   └── task.test.ts         # Jest tests
├── dist/                    # Compiled JS (generated)
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript config
├── jest.config.js           # Jest config
├── package.json
└── README.md
```

## Database Schema

### Task Model
- `id` (UUID, Primary Key)
- `title` (String, Required)
- `description` (Text, Optional)
- `status` (Enum: 'pending' | 'completed')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## TypeScript Benefits
- Full type safety across the entire codebase
- Better IDE autocomplete and error detection
- Interfaces for Task model attributes
- Type-safe request/response handling

## Deployment

This backend is ready to deploy on:
- **Railway.app**
- **Render.com**
- **Heroku**

Build command: `npm run build`
Start command: `npm start`

Don't forget to add your `DATABASE_URL` environment variable in the hosting platform.