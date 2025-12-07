```
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface SelectionState {
    text: string;
    x: number;
    y: number;
}

export default function Chatbot(): JSX.Element {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am your AI Robotics Professor. Ask me anything about ROS 2, Isaac Sim, or VLA models!'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selection, setSelection] = useState<SelectionState | null>(null);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle Text Selection
    useEffect(() => {
        const handleSelection = () => {
            const sel = window.getSelection();
            if (sel && sel.toString().trim().length > 0) {
                const range = sel.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                setSelection({
                    text: sel.toString().trim(),
                    // Position centered above the selection
                    x: rect.left + rect.width / 2,
                    y: rect.top + window.scrollY
                });
            } else {
                setSelection(null);
            }
        };

        // We listen on the document
        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const processStream = async (response: Response, aiMsgId: string) => {
        if (!response.ok) throw new Error("Network response error");
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No reader available');

        setIsTyping(false); // Start streaming
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = new TextDecoder().decode(value);
            setMessages(prev => prev.map(msg => 
                msg.id === aiMsgId 
                    ? { ...msg, content: msg.content + text }
                    : msg
            ));
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const currentInput = input.trim();
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: currentInput };

        setInput('');
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentInput, stream: true }),
            });

            // Create placeholder
            const aiMsgId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);
            
            await processStream(response, aiMsgId);

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Error connecting to AI." }]);
        }
    };

    const handleExplainSelection = async () => {
        if (!selection) return;
        
        const selectedText = selection.text;
        const query = "Explain this concept in the context of robotics";
        
        setSelection(null); // Clear selection popup
        setIsOpen(true); // Open chat

        // Add user message indicating selection
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: `Explain: "${selectedText.substring(0, 50)}${selectedText.length > 50 ? '...' : ''}"`
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:8000/query-selected', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    query: query,
                    selected_text: selectedText, 
                    stream: true 
                }),
            });

            const aiMsgId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);

            await processStream(response, aiMsgId);

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Error explaining selection." }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Selection Popup */}
            {selection && !isOpen && (
                <button
                    onClick={handleExplainSelection}
                    style={{ 
                        position: 'absolute', 
                        left: selection.x, 
                        top: selection.y,
                        transform: 'translate(-50%, -120%)'
                    }}
                    className="z-[9999] bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 hover:bg-black hover:scale-105 transition-all animate-fade-in-up"
                >
                    <span className="text-cyan-400">✨</span>
                    Explain with AI
                </button>
            )}

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
                {/* Chat Window */}
                <div 
                    className={clsx(
                        "pointer-events-auto w-[380px] max-w-[90vw] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out origin-bottom-right mb-4 flex flex-col",
                        isOpen 
                            ? "opacity-100 scale-100 translate-y-0 h-[600px]" 
                            : "opacity-0 scale-90 translate-y-10 h-0 pointer-events-none"
                    )}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-purple-900/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Robo Professor</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className={clsx("w-2 h-2 rounded-full animate-pulse", isTyping ? "bg-cyan-400" : "bg-green-500")}></span>
                                    <span className="text-xs text-green-400">{isTyping ? "Thinking..." : "Online • VLA-Powered"}</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {messages.map((msg) => (
                             <div key={msg.id} className={clsx("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                <div 
                                    className={clsx(
                                        "max-w-[85%] text-sm px-4 py-3 rounded-2xl border",
                                        msg.role === 'user' 
                                            ? "bg-blue-600 text-white border-blue-500 rounded-tr-sm" 
                                            : "bg-white/10 text-gray-200 border-white/5 rounded-tl-sm"
                                    )}
                                >
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                 <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black/40">
                       <div className="relative">
                            <input 
                                ref={inputRef}
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask a question..." 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-500"
                                disabled={isTyping}
                            />
                             <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                       </div>
                       <div className="text-center mt-2">
                           <span className="text-[10px] text-gray-600">AI can make mistakes. Check important info.</span>
                       </div>
                    </div>
                </div>

                {/* Floating Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
                        isOpen 
                            ? "bg-gray-800 text-gray-400 rotate-90" 
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white animate-bounce-subtle"
                    )}
                >
                     <svg className={clsx("w-7 h-7 transition-all duration-300", isOpen ? "rotate-45" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        )}
                    </svg>
                    
                    {/* Notification Badge */}
                    {!isOpen && messages.length === 1 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full"></span>
                    )}
                </button>
            </div>
        </>
    );
}
```
