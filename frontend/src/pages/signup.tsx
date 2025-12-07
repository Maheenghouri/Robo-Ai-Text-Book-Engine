import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Signup(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        background: 'software', // Default choice
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }

        // Simulate API Call
        setTimeout(() => {
            console.log('Signup attempt:', formData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Layout title="Sign Up" description="Join the Robo Text Book Engine">
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-20">

                {/* Background Visuals */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[90px] animate-float" />
                    <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl glass shadow-2xl border border-white/10 animate-fade-in-up mx-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Start your journey into Physical AI
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder:text-gray-600"
                                placeholder="Ada Lovelace"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder:text-gray-600"
                                placeholder="engineer@robotics.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder:text-gray-600"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Personalization Section */}
                        <div className="pt-4 pb-2">
                            <label className="text-sm font-medium text-blue-300 block mb-3">
                                Select Your Background
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, background: 'software' })}
                                    className={clsx(
                                        "p-4 rounded-xl border transition-all text-left group relative overflow-hidden",
                                        formData.background === 'software'
                                            ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    )}
                                >
                                    <div className="font-semibold mb-1">Software</div>
                                    <div className="text-xs opacity-70">ROS 2, Python, AI</div>
                                    {formData.background === 'software' && (
                                        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none" />
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, background: 'hardware' })}
                                    className={clsx(
                                        "p-4 rounded-xl border transition-all text-left group relative overflow-hidden",
                                        formData.background === 'hardware'
                                            ? "bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    )}
                                >
                                    <div className="font-semibold mb-1">Hardware</div>
                                    <div className="text-xs opacity-70">Sensors, Circuits</div>
                                    {formData.background === 'hardware' && (
                                        <div className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={clsx(
                                "w-full py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg mt-4",
                                isLoading
                                    ? "bg-blue-600/50 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25 active:scale-[0.98]"
                            )}
                        >
                            {isLoading ? "Creating Account..." : "Join the Revolution"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
