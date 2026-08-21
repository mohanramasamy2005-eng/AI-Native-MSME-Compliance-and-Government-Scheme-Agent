import { KnowledgeDocument } from '../models/KnowledgeDocument.js';
export async function searchGovernmentKnowledgeBase(query) {
    try {
        const documents = await KnowledgeDocument.find();
        if (!documents || documents.length === 0)
            return [];
        const qTokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
        const results = [];
        for (const doc of documents) {
            for (const chunk of doc.chunks) {
                let score = 0;
                const textLower = chunk.text.toLowerCase();
                for (const token of qTokens) {
                    if (textLower.includes(token))
                        score += 2;
                    if (chunk.keywords.some((kw) => kw.toLowerCase().includes(token)))
                        score += 3;
                }
                if (score > 0) {
                    results.push({
                        docId: doc.docId,
                        sourceName: doc.sourceName,
                        officialUrl: doc.officialUrl,
                        documentTitle: doc.documentTitle,
                        lastVerifiedDate: doc.lastVerifiedDate,
                        category: doc.category,
                        matchedText: chunk.text,
                        relevanceScore: score,
                    });
                }
            }
        }
        // Sort by relevance score descending
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);
        return results.slice(0, 3);
    }
    catch (err) {
        console.error('RAG Retrieval Error:', err);
        return [];
    }
}
