import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initialChatMessages } from '../services/mockData';
import { ChatMessage, StructuredAiResponse, RagCitation } from '../types';
import { api } from '../services/api';

// --- Sub-component: Verified Source Citation Badge ---
const CitationBadge: React.FC<{ citation: NonNullable<ChatMessage['recommendations']>[0]['sourceMetadata'] }> = ({
  citation,
}) => {
  if (!citation) return null;
  return (
    <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-[11px] flex items-start gap-2">
      <span
        className="material-symbols-outlined text-emerald-600 mt-0.5 shrink-0"
        style={{ fontSize: '16px' }}
      >
        verified
      </span>
      <div className="min-w-0">
        <div className="font-bold text-emerald-800 flex items-center gap-1">
          Verified Government Source
          <span className="text-[9px] bg-emerald-100 border border-emerald-300 text-emerald-700 px-1 py-0.5 rounded font-mono">
            {citation.category}
          </span>
        </div>
        <div className="text-emerald-700 truncate font-medium">{citation.documentTitle}</div>
        <div className="text-emerald-600">{citation.sourceName}</div>
        <div className="flex items-center justify-between mt-0.5 gap-2">
          <span className="text-emerald-500">
            Last Verified: <strong className="text-emerald-700">{citation.lastVerifiedDate}</strong>
          </span>
          <a
            href={citation.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
          >
            Official Link
            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>
              open_in_new
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: RAG Retrieved Citations Panel ---
const RagCitationsPanel: React.FC<{ citations: RagCitation[] }> = ({ citations }) => {
  if (!citations || citations.length === 0) return null;
  return (
    <div className="mt-3 rounded-xl border border-secondary/20 bg-secondary-container/10 p-3 space-y-2">
      <div className="flex items-center gap-1 text-xs font-bold text-secondary uppercase tracking-wider">
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
          library_books
        </span>
        Government Knowledge Sources Used
      </div>
      {citations.map((c) => (
        <div key={c.docId} className="flex items-start gap-2 text-[11px]">
          <span
            className="material-symbols-outlined text-secondary shrink-0 mt-0.5"
            style={{ fontSize: '14px' }}
          >
            gavel
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-primary truncate">{c.documentTitle}</div>
            <div className="text-on-surface-variant">{c.sourceName}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] bg-secondary/10 border border-secondary/20 text-secondary px-1.5 py-0.5 rounded font-mono">
                {c.category}
              </span>
              <span className="text-on-surface-variant">Verified: {c.lastVerifiedDate}</span>
              <a
                href={c.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline font-bold flex items-center gap-0.5"
              >
                Source
                <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main AssistantPage ---
export const AssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const response: StructuredAiResponse = await api.sendAssistantMessage(text);

      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        text: response.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: response.recommendations,
        suggestions: response.suggestedPrompts,
        retrievedCitations: response.retrievedCitations,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      handleSend(query);
    }
  }, [searchParams]);

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col lg:flex-row gap-gutter">
      {/* Main Chat Canvas */}
      <div className="flex-1 bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-xs">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg font-bold text-primary">MSME AI Intelligence Assistant</h3>
              <p className="font-body-md text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span>Context: ABC Engineering Pvt Ltd (Manufacturing) · RAG: Government Knowledge Active</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
              Gov. Sources Active
            </span>
            <span className="bg-secondary-fixed text-secondary text-xs px-2.5 py-1 rounded-full font-bold">
              RAG Engine
            </span>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 p-md overflow-y-auto space-y-md">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-xl p-md text-sm whitespace-pre-line leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-secondary text-on-secondary rounded-br-none shadow-xs font-medium'
                    : 'bg-surface-container-low border border-outline-variant text-primary rounded-bl-none shadow-xs font-body-md'
                }`}
              >
                {msg.text}
              </div>

              {/* Render Structured AI Recommendation Cards */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="w-full max-w-[95%] mt-md space-y-sm">
                  {msg.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-lowest border border-secondary/30 rounded-xl p-md shadow-sm space-y-xs hover:border-secondary transition-all"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-xs">
                        <h4 className="font-title-md text-title-md font-bold text-primary flex items-center gap-xs">
                          <span className="material-symbols-outlined text-secondary text-[20px]">
                            stars
                          </span>
                          <span>{rec.title}</span>
                        </h4>
                        <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-container border border-tertiary-fixed-dim/30 px-2 py-0.5 rounded text-xs font-bold">
                          {rec.relevanceMatch}
                        </span>
                      </div>

                      <p className="text-xs text-on-surface-variant font-medium">
                        <strong className="text-primary">Why Relevant:</strong> {rec.whyRelevant}
                      </p>

                      {rec.eligibilityFactors && rec.eligibilityFactors.length > 0 && (
                        <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant text-xs space-y-0.5">
                          <span className="font-bold text-primary block">Eligibility Factors:</span>
                          {rec.eligibilityFactors.map((f, i) => (
                            <span key={i} className="inline-block mr-2 text-on-surface-variant">
                              • {f}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap justify-between items-center gap-sm pt-xs text-xs font-medium border-t border-outline-variant/50">
                        <span className="text-secondary font-bold flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                          Action: {rec.recommendedAction}
                        </span>

                        <div className="flex items-center gap-md">
                          {rec.deadline && (
                            <span className="text-error font-bold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[14px]">event</span>
                              {rec.deadline}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Verified Government Source Citation Badge */}
                      <CitationBadge citation={rec.sourceMetadata} />
                    </div>
                  ))}
                </div>
              )}

              {/* RAG Retrieved Citations Panel */}
              {msg.retrievedCitations && msg.retrievedCitations.length > 0 && (
                <div className="w-full max-w-[95%]">
                  <RagCitationsPanel citations={msg.retrievedCitations} />
                </div>
              )}

              <span className="text-[10px] text-on-surface-variant mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>

              {/* Suggestions chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-xs mt-sm">
                  {msg.suggestions.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(chip)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed text-secondary font-bold border border-secondary/20 transition-all text-left flex items-center gap-xs shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                      <span>{chip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-sm p-md bg-surface-container-low rounded-xl w-max">
              <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-semibold text-on-surface-variant">
                Querying business context & government knowledge base...
              </span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-sm"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask: 'What schemes are relevant?', 'What compliance should I focus on?', 'What should I do first?'..."
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-md py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-container/40"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-md py-2.5 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-container font-bold text-sm transition-colors flex items-center gap-xs shadow-xs disabled:opacity-50"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Assistant Context Sidebar */}
      <div className="hidden lg:block w-80 bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm space-y-md overflow-y-auto">
        <h4 className="font-title-md text-title-md font-bold text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
          <span>Grounded Business Context</span>
        </h4>

        <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Active Entity:</span>
            <span className="font-bold text-primary">ABC Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Sector:</span>
            <span className="font-bold text-primary">Manufacturing</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Location:</span>
            <span className="font-bold text-primary">Peenya, TN</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Turnover Slab:</span>
            <span className="font-bold text-primary">₹1.2 Cr (Micro)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Udyam Status:</span>
            <span className="font-bold text-emerald-600">Active</span>
          </div>
        </div>

        {/* Government Knowledge Base Sources */}
        <div>
          <h5 className="font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-emerald-600" style={{ fontSize: '14px' }}>verified</span>
            Trusted Gov. Knowledge Sources
          </h5>
          <div className="space-y-2">
            {[
              { name: 'CGTMSE Scheme Guidelines', url: 'https://cgtmse.in', category: 'Schemes', verified: '2026-08-20' },
              { name: 'ZED Subsidy Directive', url: 'https://zed.msme.gov.in', category: 'Subsidies', verified: '2026-08-20' },
              { name: 'TNPCB CTO Renewal Rules', url: 'https://ocmms.tnpcb.gov.in', category: 'Compliance', verified: '2026-08-20' },
              { name: 'GST Filing Circular 2026', url: 'https://gst.gov.in', category: 'Compliance', verified: '2026-08-20' },
            ].map((src, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px]">
                <div className="font-semibold text-emerald-800">{src.name}</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-emerald-600 font-mono text-[10px]">{src.category} · {src.verified}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
                  >
                    Link
                    <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>open_in_new</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-xs">
            Test Prompts
          </h5>
          <div className="space-y-xs">
            {[
              'What schemes are relevant to my business?',
              'What compliance should I focus on?',
              'What should I do first?',
              'What deadlines are coming up?',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-xs text-primary font-medium border border-outline-variant/60 transition-colors flex items-center justify-between group"
              >
                <span className="group-hover:text-secondary transition-colors">{prompt}</span>
                <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-secondary">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
