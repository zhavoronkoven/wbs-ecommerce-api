import mongoose from "mongoose";

async function connect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_NAME = process.env.MONGODB_NAME;

  if (!MONGODB_URI) throw new Error("URI is missing, check your .env file");
  if (!MONGODB_NAME) throw new Error("database name is missing, check your .env file");

  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_NAME });
    const db = mongoose.connection.db;

    if (!db) throw new Error("database is not initialized");

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export const db = await connect();
