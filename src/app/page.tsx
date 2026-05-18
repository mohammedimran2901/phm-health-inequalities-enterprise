'use client';

import { useState } from 'react';
import { Search, BarChart3, Target, Download, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Redirect to dashboard with search query
      window.location.href = `/dashboard?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--nhs-blue)] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                HealthMap <span className="text-[var(--nhs-blue)]">AI</span>
              </span>
              <span className="ml-2 px-2 py-0.5 bg-[var(--nhs-blue)]/10 text-[var(--nhs-blue)] text-xs font-medium rounded-full">
                Enterprise
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-medium">
                Dashboard
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900 font-medium">
                Pricing
              </Link>
              <button className="nhs-button text-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nhs-blue)]/10 rounded-full text-[var(--nhs-blue)] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Population Health Intelligence
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Health Inequalities Analysis for{' '}
            <span className="text-[var(--nhs-blue)]">NHS ICS</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Professional-grade analytics for Integrated Care Systems, trusts, and researchers. 
            Identify deprivation patterns and reduce health inequalities with data-driven insights.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-[var(--nhs-blue)]/20 rounded-2xl blur-xl group-hover:bg-[var(--nhs-blue)]/30 transition-all"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area, Local Authority, or LSOA..."
                  className="flex-1 px-4 py-4 text-lg outline-none text-slate-700 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="m-2 px-6 py-3 bg-[var(--nhs-blue)] text-white rounded-xl font-semibold hover:bg-[var(--nhs-dark-blue)] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : 'Analyze'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatCard number="32,844" label="LSOAs Analyzed" icon="📍" />
            <StatCard number="6,569" label="Core 20% Areas" icon="🎯" />
            <StatCard number="317" label="Local Authorities" icon="🏛️" />
            <StatCard number="42" label="ICS/Trusts" icon="🏥" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Inequality Analytics"
            description="Advanced metrics including Slope Index of Inequality (SII) and Relative Index of Inequality (RII)"
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Core20PLUS5 Tracker"
            description="Monitor NHS targets for the most deprived 20% and 5 key clinical areas"
          />
          <FeatureCard
            icon={<Download className="w-6 h-6" />}
            title="Data Export"
            description="Export data in multiple formats for reports, presentations, and further analysis"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[var(--nhs-blue)] rounded flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">HealthMap AI</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 HealthMap AI. Population Health Intelligence for NHS.
            </p>
            <div className="flex gap-6 text-sm text-slate-600">
              <Link href="#" className="hover:text-slate-900">Privacy</Link>
              <Link href="#" className="hover:text-slate-900">Terms</Link>
              <Link href="#" className="hover:text-slate-900">Documentation</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-[var(--nhs-blue)] mb-1">{number}</div>
      <div className="text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[var(--nhs-blue)]/20 transition-all">
      <div className="w-12 h-12 bg-[var(--nhs-blue)]/10 rounded-xl flex items-center justify-center text-[var(--nhs-blue)] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}