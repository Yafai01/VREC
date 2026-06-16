import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, MessageCircle, X, HelpCircle, GraduationCap, Building2, UserCheck, AlertCircle } from "lucide-react";

interface ChatbotProps {
  isFloatingOnly?: boolean;
}

const PRESET_PROMPTS = [
  { text: "What is the EAMCET Code?", type: "code" },
  { text: "Tell me about B.Tech CSE details", type: "branch" },
  { text: "Are there hostels on VREC campus?", type: "facilities" },
  { text: "What is the Highest Placement offer?", type: "placements" }
];

export default function Chatbot({ isFloatingOnly = false }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "wel-1",
      role: "assistant",
      content: "Hello! Name is Vijay, your intelligent Admission & Academic counselor of Vijay Rural Engineering College (VREC). Ask me about TS-EAMCET codes, branch intakes, hostel vacancies, fee reimbursement, or placement statistics!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, floatingOpen]);

  // Handle message send
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      // Prepare full message context for Express Gemini integration
      const contextList = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextList })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with VREC Counselor server.");
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: data.text || "Pardon, please ask that again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);

    } catch (e: any) {
      console.error(e);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "⚠️ Connection slight delay. I am running in local fallback context. Please make sure that standard server environment variables are initialized properly. VREC Counseling Code is **VJAY** and B.Tech direct helpline is +91-8462-223456.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (txt: string) => {
    handleSendMessage(txt);
  };

  const innerComponent = () => {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
        
        {/* Chat Banner Header */}
        <div className="bg-gradient-to-r from-red-850 via-slate-950 to-slate-950 px-4 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-amber-400 flex items-center justify-center shadow">
              <Sparkles className="h-5 w-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-white uppercase tracking-wider">VREC AI Counselor</span>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold leading-none">Powered by Gemini 3.5 Flash</p>
            </div>
          </div>
          {isFloatingOnly && (
            <button 
              onClick={() => setFloatingOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div 
                key={m.id} 
                className={`flex ${isUser ? "justify-end" : "justify-start"} animate-scale-in`}
              >
                <div 
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed shadow-sm relative ${
                    isUser 
                      ? "bg-amber-400 text-slate-950 font-semibold rounded-tr-none" 
                      : "bg-slate-850 text-slate-100 rounded-tl-none border border-slate-800"
                  }`}
                >
                  {/* Message body with basic line break rendering */}
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  
                  <span className={`block text-[8px] mt-1.5 text-right font-mono ${
                    isUser ? "text-slate-900/60" : "text-slate-500"
                  }`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-850 border border-slate-800 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Vijay is formulating answers...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length < 3 && (
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-900 flex flex-wrap gap-1.5 shrink-0 justify-center">
            {PRESET_PROMPTS.map((chip, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(chip.text)}
                className="text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-400 px-2.5 py-1 rounded-full transition cursor-pointer"
              >
                {chip.text}
              </button>
            ))}
          </div>
        )}

        {/* Form Inputs */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Type your eligibility / syllabus questions..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-slate-950 border-none rounded px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold px-4 rounded-lg flex items-center justify-center transition cursor-pointer select-none"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    );
  };

  if (isFloatingOnly) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Toggle bubble button */}
        {!floatingOpen ? (
          <button
            onClick={() => setFloatingOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-tr from-red-800 to-amber-500 text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all outline-none border-none select-none relative group ring-4 ring-slate-950/20"
          >
            <MessageCircle className="h-6 w-6 text-white group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
              AI
            </span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[460px]">
            {innerComponent()}
          </div>
        )}
      </div>
    );
  }

  // Full sized tab component
  return (
    <div id="full-chatbot-section" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12 h-[550px]">
      {innerComponent()}
    </div>
  );
}
