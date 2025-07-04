import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import connectDB from './lib/db.js';
import todosRouter from './routes/todo.routes.js';
import { Clerk } from '@clerk/clerk-sdk-node';

dotenv.config();

const PORT = process.env.PORT || 5001;

const clerk = new Clerk({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies/session
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Use CORS middleware before other middleware

app.use(express.json());
app.use(clerk.expressRequireAuth());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/my-todos', todosRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});