import mongoose from 'mongoose';
import { seedInitialData } from '../services/seedService.js';
import { ingestGovernmentKnowledgeBase } from '../services/ragIngestionService.js';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/msme_ai_db';
    console.log(`🔌 Connecting to MongoDB at ${connStr}...`);
    
    await mongoose.connect(connStr);
    console.log(`🚀 MongoDB Connected Successfully: ${mongoose.connection.host}`);

    // 1. Seed initial business database if empty
    await seedInitialData();

    // 2. Run RAG Knowledge Ingestion Pipeline
    await ingestGovernmentKnowledgeBase();
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: Could not connect to local Mongo service. Running in-memory API fallback mode.`);
  }
};
