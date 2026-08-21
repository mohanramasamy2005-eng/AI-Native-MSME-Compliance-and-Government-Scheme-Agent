import mongoose, { Schema, Document } from 'mongoose';

export interface IKnowledgeChunk {
  chunkId: string;
  text: string;
  keywords: string[];
}

export interface IKnowledgeDocument extends Document {
  docId: string;
  sourceName: string;
  officialUrl: string;
  documentTitle: string;
  publishedDate: string;
  lastVerifiedDate: string;
  category: 'Schemes' | 'Subsidies' | 'Compliance' | 'Registrations' | 'Licences' | 'Certifications' | 'Tenders' | 'Renewals';
  chunks: IKnowledgeChunk[];
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeChunkSchema: Schema = new Schema({
  chunkId: { type: String, required: true },
  text: { type: String, required: true },
  keywords: [{ type: String }],
});

const KnowledgeDocumentSchema: Schema = new Schema(
  {
    docId: { type: String, required: true, unique: true },
    sourceName: { type: String, required: true },
    officialUrl: { type: String, required: true },
    documentTitle: { type: String, required: true },
    publishedDate: { type: String, required: true },
    lastVerifiedDate: { type: String, required: true },
    category: {
      type: String,
      enum: ['Schemes', 'Subsidies', 'Compliance', 'Registrations', 'Licences', 'Certifications', 'Tenders', 'Renewals'],
      required: true,
    },
    chunks: [KnowledgeChunkSchema],
  },
  { timestamps: true }
);

export const KnowledgeDocument = mongoose.model<IKnowledgeDocument>('KnowledgeDocument', KnowledgeDocumentSchema);
