import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

export default function Chatbot(): JSX.Element {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Auto-open for demo purposes if user is logged in
    useEffect(() => {
        if (user) {
            // setTimeout(() => setIsOpen(true), 2000);
        }
    }, [user]);

    return (
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
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-xs text-green-400">Online • VLA-Powered</span>
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

                {/* Messages Area (Placeholder for Task 25) */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="flex justify-start">
                        <div className="bg-white/10 border border-white/5 text-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm">
                            <p>Hello! I am your AI Robotics Professor.</p>
                            <p className="mt-2 text-xs text-gray-400">Ask me anything about ROS 2, Isaac Sim, or VLA models!</p>
                        </div>
                    </div>
                </div>

                {/* Input Area (Placeholder for Task 25) */}
                <div className="p-4 border-t border-white/10 bg-black/40">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask a question..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-gray-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
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
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full"></span>
                )}
            </button>
        </div>
    );
}
