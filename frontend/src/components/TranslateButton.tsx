import React, { useState } from 'react';
import clsx from 'clsx';

export default function TranslateButton(): React.ReactElement {
    const [loading, setLoading] = useState(false);
    const [translated, setTranslated] = useState(false);

    const [originalHtml, setOriginalHtml] = useState<string>('');
    const [targetLang, setTargetLang] = useState('ur');

    // Languages map
    const languages = [
        { code: 'ur', name: 'Urdu (اردو)' },
        { code: 'hi', name: 'Hindi (हिंदी)' },
        { code: 'es', name: 'Spanish (Español)' },
        { code: 'fr', name: 'French (Français)' },
        { code: 'ar', name: 'Arabic (العربية)' },
        { code: 'zh', name: 'Chinese (中文)' }
    ];

    const currentLangName = languages.find(l => l.code === targetLang)?.name || targetLang;

    const handleTranslate = async () => {
        const article = document.querySelector('.theme-doc-markdown') as HTMLElement;
        if (!article) {
            console.error("No article content found to translate");
            return;
        }

        if (translated) {
            // If already translated, and user clicks again, we might want to allow re-translating to new lang
            // But for simple toggle logic, let's restore first if they want to switch.
            // Or better: Check if they changed language.
            // For now, simpler: Toggle off restores original.
            if (originalHtml) article.innerHTML = originalHtml;
            setTranslated(false);
            return;
        }

        setLoading(true);
        try {
            // Save original
            setOriginalHtml(article.innerHTML);

            // Get text to translate
            const textToTranslate = article.innerText;

            const response = await fetch('http://localhost:8000/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: textToTranslate,
                    target_lang: targetLang
                }),
            });

            const data = await response.json();

            if (data.translated_text) {
                // Determine direction based on language
                const isRtl = ['ur', 'ar'].includes(targetLang);

                article.innerHTML = `
                    <div dir="${isRtl ? 'rtl' : 'ltr'}" class="translated-content" style="font-family: ${isRtl ? "'Noto Nastaliq Urdu', serif" : 'inherit'}; font-size: 1.2em; line-height: 1.8; white-space: pre-wrap; color: #e2e8f0;">
                        ${data.translated_text}
                    </div>
                `;
                setTranslated(true);
            } else {
                throw new Error(data.error || "Translation failed");
            }
        } catch (error) {
            console.error("Translation error:", error);
            alert("Failed to translate content. Is the backend running?");
        } finally {
            setLoading(false);
        }
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
                            <span className="font-bold text-lg">
                                {languages.find(l => l.code === targetLang)?.code.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                {translated ? `Translated to ${currentLangName}` : "AI Translation"}
                            </h3>
                            {!translated && (
                                <div className="flex items-center gap-2 mt-1">
                                    <select
                                        value={targetLang}
                                        onChange={(e) => setTargetLang(e.target.value)}
                                        className="bg-black/30 border border-white/10 text-xs text-white rounded px-2 py-1 focus:outline-none focus:border-purple-500 cursor-pointer"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang.code} value={lang.code} className="bg-gray-900 text-white">
                                                {lang.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {translated && (
                                <p className="text-xs text-emerald-400/70 mt-1">
                                    Click button to show original
                                </p>
                            )}
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
                            translated ? "Show Original" : "Translate"
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
