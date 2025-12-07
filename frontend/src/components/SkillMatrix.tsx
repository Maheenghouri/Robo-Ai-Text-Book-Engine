import React, { useState } from 'react';
import clsx from 'clsx';

interface Skill {
    id: string;
    name: string;
    description: string;
    icon: JSX.Element;
    active: boolean;
    color: string;
}

export default function SkillMatrix(): JSX.Element {
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: 'vision',
            name: 'Visual Cortex',
            description: 'Object detection, Segmentation, and Depth perception.',
            active: true,
            color: 'blue'
        },
        {
            id: 'navigation',
            name: 'Navigation Subagent',
            description: 'VSLAM, Path Planning (Nav2), and Obstacle Avoidance.',
            active: false,
            color: 'green'
        },
        {
            id: 'speech',
            name: 'Broca\'s Area',
            description: 'Speech recognition (Whisper) and Synthesis (TTS).',
            active: false,
            color: 'purple'
        },
        {
            id: 'manipulation',
            name: 'Motor Control',
            description: 'Fine motor skills for grasping and manipulation.',
            active: true,
            color: 'orange'
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
                                    {/* Icon placeholder using first letter */}
                                    <span className="font-bold text-lg">{skill.name[0]}</span>
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
