import mongoose from 'mongoose';

export async function connect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_NAME = process.env.MONGODB_NAME;

  if (!MONGODB_URI) throw new Error('URI is missing, check your .env file');
  if (!MONGODB_NAME) throw new Error('database name is missing, check your .env file');

  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_NAME });

  const db = mongoose.connection.db;

  if (!db) throw new Error('MongoDB is not initialized');

  console.log('MongoDB connected');

  return db;
}

export async function disconnect() {
  await mongoose.disconnect();

  console.log('MongoDB disconnected');
}
