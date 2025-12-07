import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="The Ultimate Resource for Physical AI and Humanoid Robotics">

      {/* Hero Section */}
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">

          {/* Background Glow Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-primary/80 animate-fade-in-up">
            Build the Future of <br className="hidden md:block" />
            <span className="text-blue-500">Physical AI</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up delay-100">
            The definitive interactive guide to **ROS 2**, **NVIDIA Isaac Sim**, and **Humanoid Robotics**.
            Master the stack that powers the next generation of intelligent machines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Link
              to="/docs/intro"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
              Start Learning
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold text-lg transition-all border border-white/20">
              Create Account
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="ROS 2 Mastery"
              description="Deep dive into the robotic nervous system. Control nodes, topics, and real-time communication."
            />
            <FeatureCard
              title="Digital Twins"
              description="Simulate physics-accurate environments in Gazebo and Unity before deploying to hardware."
            />
            <FeatureCard
              title="Vision-Language-Action"
              description="Integrate LLMs with robotic control policies for true autonomous agents."
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl glass hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-blue-500/50 group cursor-default">
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
