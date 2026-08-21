import mongoose, { Schema } from 'mongoose';
const KnowledgeChunkSchema = new Schema({
    chunkId: { type: String, required: true },
    text: { type: String, required: true },
    keywords: [{ type: String }],
});
const KnowledgeDocumentSchema = new Schema({
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
}, { timestamps: true });
export const KnowledgeDocument = mongoose.model('KnowledgeDocument', KnowledgeDocumentSchema);
