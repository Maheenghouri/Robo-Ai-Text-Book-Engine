import React, { useState } from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import clsx from 'clsx';

export default function PersonalizeButton(): JSX.Element {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [personalized, setPersonalized] = useState(false);

    const handlePersonalize = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        setLoading(true);
        // Simulate API call to /personalize
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setPersonalized(true);
    };

    return (
        <div className="mb-6">
            <div
                className={clsx(
                    "p-4 rounded-xl border transition-all duration-300 backdrop-blur-md",
                    personalized
                        ? "bg-green-500/10 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 shadow-lg"
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "p-2 rounded-lg",
                            personalized ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                        )}>
                            {personalized ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                {personalized ? "Content Personalized" : "AI Learning Assistant"}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {user
                                    ? `Optimized for ${user.background} Engineering`
                                    : "Login to customize this chapter for your background"
                                }
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handlePersonalize}
                        disabled={loading || personalized}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                            user
                                ? (personalized ? "hidden" : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]")
                                : "bg-white/10 text-white hover:bg-white/20"
                        )}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Optimizing...
                            </span>
                        ) : (
                            user ? "Personalize" : "Login"
                        )}
                    </button>
                </div>

                {personalized && (
                    <div className="mt-3 pt-3 border-t border-green-500/20 animate-fade-in-up text-sm text-gray-300">
                        <p>✨ Content adjusted! Added 3 analogies relevant to <strong>{user.background}</strong> systems and simplified 2 complex abstract concepts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
