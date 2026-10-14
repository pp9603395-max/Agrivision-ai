import React, { useState, useRef, useEffect } from 'react';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Sprout,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface AgriChatbotVoiceProps {
  language: LanguageCode;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const AgriChatbotVoice: React.FC<AgriChatbotVoiceProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I am your AI Agriculture Scientist. Ask me any question regarding NPK fertilizers, soil health, pest control, weather warnings, crop selection, or government schemes!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['ICAR Agriculture Guide', 'AgriVision AI Engine']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, language })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: data.sourceBadges || ['ICAR Guidelines']
        };
        setMessages((prev) => [...prev, botMsg]);

        // Speak aloud response if speech synthesis available
        if ('speechSynthesis' in window && !isSpeaking) {
          speakText(data.reply);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 200));
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const presetQuestions = [
    'How to control Stem Borer in Paddy?',
    'What is the ideal DAP dose for Wheat per acre?',
    'How to apply for PM-KISAN 17th Installment?',
    'What crop is best for Sandy Loam soil with pH 7.2?'
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans h-[calc(100vh-100px)] flex flex-col justify-between">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              {t.aiAssistant} <Sparkles className="w-4 h-4 text-emerald-400" />
            </h1>
            <p className="text-[11px] text-slate-400">Powered by Gemini 3.6 Flash & ICAR Agronomy Database</p>
          </div>
        </div>

        {isSpeaking && (
          <button
            onClick={() => {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
            }}
            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <VolumeX className="w-3.5 h-3.5" /> Stop Voice
          </button>
        )}
      </div>

      {/* Messages Scroll View */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex-1 overflow-y-auto space-y-4 my-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.sources && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {msg.sources.map((s, idx) => (
                    <span key={idx} className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <span className={`block text-[9px] text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 max-w-xs">
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span>Consulting Agricultural Knowledge Base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-[11px] text-slate-300 shrink-0 transition-all hover:border-emerald-500/50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl shrink-0"
      >
        <button
          type="button"
          onClick={toggleVoiceInput}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
          title="Voice input (Speech to Text)"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          placeholder="Ask agricultural question in English, Hindi, Gujarati..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none px-2"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
