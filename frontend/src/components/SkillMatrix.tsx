import React, { useState } from 'react';
import clsx from 'clsx';

interface Skill {
    id: string;
    name: string;
    description: string;
    icon: React.ReactElement;
    active: boolean;
    color: string;
}

export default function SkillMatrix(): React.ReactElement {
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: 'vision',
            name: 'Visual Cortex',
            description: 'Object detection, Segmentation, and Depth perception.',
            active: true,
            color: 'blue',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )
        },
        {
            id: 'navigation',
            name: 'Navigation Subagent',
            description: 'VSLAM, Path Planning (Nav2), and Obstacle Avoidance.',
            active: false,
            color: 'green',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            )
        },
        {
            id: 'speech',
            name: 'Broca\'s Area',
            description: 'Speech recognition (Whisper) and Synthesis (TTS).',
            active: false,
            color: 'purple',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            )
        },
        {
            id: 'manipulation',
            name: 'Motor Control',
            description: 'Fine motor skills for grasping and manipulation.',
            active: true,
            color: 'orange',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
            )
        }
    ]);

    const toggleSkill = (id: string) => {
        setSkills(skills.map(s =>
            s.id === id ? { ...s, active: !s.active } : s
        ));
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Active Subagents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={clsx(
                            "group cursor-pointer relative p-4 rounded-xl border transition-all duration-300",
                            skill.active
                                ? `bg-${skill.color}-500/10 border-${skill.color}-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]`
                                : "bg-white/5 border-white/5 hover:bg-white/10"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={clsx(
                                    "p-2 rounded-lg transition-colors",
                                    skill.active ? `bg-${skill.color}-500/20 text-${skill.color}-400` : "bg-gray-700/50 text-gray-500"
                                )}>
                                    {skill.icon}
                                </div>
                                <div>
                                    <h3 className={clsx(
                                        "font-bold text-sm",
                                        skill.active ? "text-white" : "text-gray-400"
                                    )}>{skill.name}</h3>
                                    <span className={clsx(
                                        "text-xs uppercase tracking-wider font-semibold",
                                        skill.active ? `text-${skill.color}-400` : "text-gray-600"
                                    )}>
                                        {skill.active ? "Online" : "Offline"}
                                    </span>
                                </div>
                            </div>

                            <div className={clsx(
                                "w-10 h-6 rounded-full p-1 transition-colors duration-300",
                                skill.active ? `bg-${skill.color}-500` : "bg-gray-700"
                            )}>
                                <div className={clsx(
                                    "w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300",
                                    skill.active ? "translate-x-4" : "translate-x-0"
                                )} />
                            </div>
                        </div>

                        <p className={clsx(
                            "text-xs mt-2 transition-colors",
                            skill.active ? "text-gray-300" : "text-gray-600"
                        )}>
                            {skill.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>System Resources:</span>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${(skills.filter(s => s.active).length / skills.length) * 100}%` }}
                        />
                    </div>
                    <span>{skills.filter(s => s.active).length} / {skills.length} Cores Active</span>
                </div>
            </div>
        </div>
    );
}
