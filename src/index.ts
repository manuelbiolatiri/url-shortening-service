import 'reflect-metadata';
import database from './config/database';
import dotenv from 'dotenv';
import app from './app';

// Init environment
dotenv.config();

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

database.initialize();
