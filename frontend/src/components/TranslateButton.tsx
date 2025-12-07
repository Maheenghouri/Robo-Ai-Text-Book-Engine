import React, { useState } from 'react';
import clsx from 'clsx';

export default function TranslateButton(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [translated, setTranslated] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        // Simulate translation API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        setTranslated(!translated);
    };

    return (
        <div className="mb-6">
            <div
                className={clsx(
                    "p-4 rounded-xl border transition-all duration-300 backdrop-blur-md",
                    translated
                        ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 shadow-lg"
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "p-2 rounded-lg",
                            translated ? "bg-emerald-500/20 text-emerald-400" : "bg-purple-500/20 text-purple-400"
                        )}>
                            <span className="font-bold text-lg">آب</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                {translated ? "Translated to Urdu" : "Urdu Translation"}
                            </h3>
                            <p className="text-xs text-gray-400">
                                Powered by Sonic-1 AI Translation Engine
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleTranslate}
                        disabled={loading}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                            translated
                                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/50"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                        )}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Translating...
                            </span>
                        ) : (
                            translated ? "Show Original" : "Translate to Urdu"
                        )}
                    </button>
                </div>

                {translated && (
                    <div className="mt-3 pt-3 border-t border-emerald-500/20 animate-fade-in-up">
                        <p className="text-emerald-300 font-medium text-right font-serif text-lg leading-relaxed">
                            یہ مواد مصنوعی ذہانت کے ذریعے آپ کی آسانی کے لیے اردو میں ترجمہ کیا گیا ہے۔
                            <br />
                            <span className="text-sm opacity-70">(Simulated translation overlay active)</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
