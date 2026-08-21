import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KnowledgeDocument } from '../models/KnowledgeDocument.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function ingestGovernmentKnowledgeBase() {
  try {
    const kbPath = path.resolve(__dirname, '../data/knowledge_base');
    if (!fs.existsSync(kbPath)) {
      console.log('📁 Knowledge base directory not found:', kbPath);
      return;
    }

    const files = fs.readdirSync(kbPath).filter((f) => f.endsWith('.json'));
    console.log(`📚 Found ${files.length} trusted government knowledge package files.`);

    for (const file of files) {
      const filePath = path.join(kbPath, file);
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      const existing = await KnowledgeDocument.findOne({ docId: fileData.docId });
      if (!existing) {
        await KnowledgeDocument.create(fileData);
        console.log(`✅ Ingested government document: "${fileData.documentTitle}" (${fileData.sourceName})`);
      } else {
        await KnowledgeDocument.updateOne({ docId: fileData.docId }, fileData);
        console.log(`🔄 Updated ingested document: "${fileData.documentTitle}"`);
      }
    }
    console.log('✨ Government Knowledge Base Ingestion Pipeline Complete!');
  } catch (err) {
    console.error('❌ Error during knowledge base ingestion:', err);
  }
}
