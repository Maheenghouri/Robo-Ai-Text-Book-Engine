import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroVisual from '@site/src/components/HeroVisual';

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

          {/* Visual Element */}
          <div className="mb-8 animate-fade-in-up">
            <HeroVisual />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-500 animate-fade-in-up">
            Build the Future of <br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-400">Physical AI</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed animate-fade-in-up delay-100">
            The definitive interactive guide to **ROS 2**, **NVIDIA Isaac Sim**, and **Humanoid Robotics**.
            Master the stack that powers the next generation of intelligent machines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Link
              to="/docs/module-1-ros2/intro"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]">
              Start Learning
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 rounded-full glass hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold text-lg transition-all">
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
    <div className="p-8 rounded-3xl glass hover:shadow-2xl transition-all duration-300 group cursor-default">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
