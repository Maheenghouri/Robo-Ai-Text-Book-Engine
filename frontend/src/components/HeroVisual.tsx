import type { ReactNode } from 'react';

export default function HeroVisual(): ReactNode {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center pointer-events-none select-none">
            {/* Central Glowing Core */}
            <div className="absolute w-48 h-48 bg-blue-500/20 rounded-full blur-[64px] animate-pulse-slow" />

            {/* Orbital Rings (CSS Circles) */}
            <div className="absolute w-64 h-64 border border-blue-500/10 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
            <div className="absolute w-96 h-96 border border-white/5 rounded-full animate-spin-slow-reverse" style={{ animationDuration: '25s' }} />

            {/* Floating Nodes (Abstract Network) */}
            <div className="absolute animate-float">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <circle cx="150" cy="150" r="40" stroke="url(#paint0_linear)" strokeWidth="2" />
                    <path d="M150 110V50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="150" cy="40" r="10" fill="#3B82F6" className="animate-pulse" />

                    <path d="M110 150H50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="40" cy="150" r="10" fill="#60A5FA" className="animate-pulse" />

                    <path d="M190 150H250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="260" cy="150" r="10" fill="#93C5FD" className="animate-pulse" />

                    <defs>
                        <linearGradient id="paint0_linear" x1="150" y1="110" x2="150" y2="190" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6" />
                            <stop offset="1" stopColor="#93C5FD" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
