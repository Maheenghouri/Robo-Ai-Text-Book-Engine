import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Redirect } from '@docusaurus/router';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard(): ReactNode {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) {
        return (
            <Layout title="Loading..." description="Loading your dashboard">
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="animate-pulse text-blue-500 font-bold">Initializing Command Center...</div>
                </div>
            </Layout>
        );
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Layout title="Command Center" description="Your Physical AI Learning Dashboard">
            <main className="min-h-screen bg-background text-foreground p-6 sm:p-12 relative overflow-hidden">

                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[128px] pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in-up">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Command Center</h1>
                            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}. Systems Online.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-4 rounded-2xl glass flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">ROS 2 Bridge: Connected</span>
                            </div>
                            <button
                                onClick={logout}
                                className="px-6 py-2 rounded-2xl border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Progress Section */}
                        <section className="lg:col-span-2 space-y-8 animate-fade-in-up delay-100">
                            <div className="p-8 rounded-3xl glass transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Current Module: The Robotic Nervous System</h2>
                                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold">IN PROGRESS</span>
                                </div>

                                <div className="w-full h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                                    <div className="h-full bg-blue-500 w-[65%]" />
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-8">
                                    <span>Progress: 65%</span>
                                    <span>Estimated Time Remaining: 45 min</span>
                                </div>

                                <Link
                                    to="/docs/module-1-ros2/nodes-topics-services"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    Resume Chapter: ROS 2 Nodes
                                </Link>
                            </div>

                            {/* Recent Activity */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold px-2 text-gray-900 dark:text-white">Mission Log</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Completed "Understanding URDF"', time: '2h ago', type: 'success' },
                                        { title: 'Quiz: Kinematics Basics', time: '1d ago', type: 'info' },
                                        { title: 'Simulation: Gazebo World setup', time: '3d ago', type: 'success' },
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-between hover:bg-white dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                                                <span className="font-medium text-gray-900 dark:text-gray-200">{item.title}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Sidebar Widgets */}
                        <aside className="space-y-8 animate-fade-in-up delay-200">
                            {/* AI Assistant Widget */}
                            <div className="p-6 rounded-3xl bg-blue-50 dark:bg-slate-900/50 dark:bg-none border border-blue-200 dark:border-blue-500/20">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                    <span className="text-2xl">⚡</span>
                                    AI Recommendation
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                    Based on your interest in <strong>{user.background === 'hardware' ? 'Hardware & Circuits' : 'Software & AI'}</strong>, we recommend starting the <em>"{user.background === 'hardware' ? 'NVIDIA Isaac Sim' : 'ROS 2 Python Client'}"</em> module next.
                                </p>
                                <button className="w-full py-3 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-600/20 dark:hover:bg-blue-600/40 border border-blue-200 dark:border-blue-500/50 text-blue-700 dark:text-blue-200 text-sm font-semibold transition-all">
                                    View Path
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 text-center shadow-sm dark:shadow-none">
                                    <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">12</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hours Sim</div>
                                </div>
                                <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 text-center shadow-sm dark:shadow-none">
                                    <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">{user.xp}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">XP Earned</div>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
        </Layout>
    );
}
