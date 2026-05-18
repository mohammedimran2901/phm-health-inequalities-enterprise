'use client';

import { useState, useEffect } from 'react';
import { Search, BarChart3, MapPin, Download, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for demonstration
const mockQuintileData = [
  { quintile: 'Q1 (Most Deprived)', value: 45.2, count: 6569 },
  { quintile: 'Q2', value: 32.1, count: 6569 },
  { quintile: 'Q3', value: 24.5, count: 6569 },
  { quintile: 'Q4', value: 18.3, count: 6569 },
  { quintile: 'Q5 (Least Deprived)', value: 12.1, count: 6569 },
];

const mockTrendData = [
  { year: '2019', sii: 42.5, rii: 1.85 },
  { year: '2020', sii: 43.1, rii: 1.88 },
  { year: '2021', sii: 44.2, rii: 1.92 },
  { year: '2022', sii: 43.8, rii: 1.89 },
  { year: '2023', sii: 44.5, rii: 1.94 },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('imd_score');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--nhs-blue)] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-slate-900">
                HealthMap <span className="text-[var(--nhs-blue)]">AI</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">
                Home
              </Link>
              <button className="text-slate-600 hover:text-slate-900 font-medium">
                Export Data
              </button>
              <div className="px-3 py-1 bg-[var(--nhs-blue)]/10 text-[var(--nhs-blue)] text-sm font-medium rounded-full">
                Pro
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a Local Authority or area..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--nhs-blue)] focus:ring-2 focus:ring-[var(--nhs-blue)]/20 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[var(--nhs-blue)] text-white rounded-xl font-semibold hover:bg-[var(--nhs-dark-blue)] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total LSOAs"
            value="32,844"
            change="+0.0%"
            icon={<MapPin className="w-5 h-5" />}
          />
          <MetricCard
            title="Core 20% Areas"
            value="6,569"
            change="20.0%"
            icon={<AlertCircle className="w-5 h-5" />}
            highlight
          />
          <MetricCard
            title="SII Score"
            value="44.5"
            change="+2.3%"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="RII Score"
            value="1.94"
            change="+4.9%"
            icon={<BarChart3 className="w-5 h-5" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quintile Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Deprivation by Quintile</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-slate-200 rounded-lg text-sm"
              >
                <option value="imd_score">IMD Score</option>
                <option value="income">Income</option>
                <option value="health">Health</option>
                <option value="employment">Employment</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockQuintileData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="quintile" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="var(--nhs-blue)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Inequality Trends</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-sm text-slate-600">
                  <div className="w-3 h-3 bg-[var(--nhs-blue)] rounded-full"></div>
                  SII
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sii" 
                    stroke="var(--nhs-blue)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--nhs-blue)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-[var(--nhs-blue)]/5 to-[var(--nhs-light-blue)]/5 rounded-2xl p-6 border border-[var(--nhs-blue)]/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[var(--nhs-blue)] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">✨</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI-Generated Insights</h3>
          </div>
          <div className="space-y-3">
            <InsightCard 
              type="critical"
              message="High deprivation concentration: 22.5% of areas in Core 20% exceed national average"
            />
            <InsightCard 
              type="warning"
              message="Significant inequality gap detected: 52.3% difference between most and least deprived quintiles"
            />
            <InsightCard 
              type="info"
              message="Priority area identified: Liverpool shows highest concentration of deprived LSOAs"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, change, icon, highlight = false }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border ${highlight ? 'border-[var(--nhs-blue)]/30 bg-[var(--nhs-blue)]/5' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-[var(--nhs-blue)] text-white' : 'bg-slate-100 text-slate-600'}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-slate-600'}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{title}</div>
    </div>
  );
}

function InsightCard({ type, message }: { type: 'critical' | 'warning' | 'info'; message: string }) {
  const colors = {
    critical: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    critical: '🔴',
    warning: '🟡',
    info: '🔵',
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${colors[type]}`}>
      <span className="text-lg">{icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}