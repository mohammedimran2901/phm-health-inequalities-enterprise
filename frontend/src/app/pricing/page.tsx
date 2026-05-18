'use client';

import { Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function Pricing() {
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
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-medium">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to our core health inequalities data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Free</h2>
              <p className="text-slate-600">Perfect for individual researchers</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">£0</span>
              <span className="text-slate-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <Feature included text="5 area searches/month" />
              <Feature included text="3 inequality analyses" />
              <Feature included text="2 data exports (CSV)" />
              <Feature included text="Basic visualizations" />
              <Feature included={false} text="Advanced AI insights" />
              <Feature included={false} text="Excel/PDF exports" />
              <Feature included={false} text="API access" />
              <Feature included={false} text="Priority support" />
            </ul>
            <button className="w-full py-3 px-6 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[var(--nhs-blue)] hover:text-[var(--nhs-blue)] transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[var(--nhs-blue)] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-[var(--nhs-blue)] text-white text-sm font-semibold rounded-full flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Recommended
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Pro</h2>
              <p className="text-slate-600">For NHS ICS, trusts & teams</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[var(--nhs-blue)]">£49</span>
              <span className="text-slate-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <Feature included text="Unlimited searches" />
              <Feature included text="Unlimited analyses" />
              <Feature included text="Unlimited exports (CSV, Excel, PDF)" />
              <Feature included text="Advanced visualizations" />
              <Feature included text="Advanced AI insights" />
              <Feature included text="Custom ICB/Trust reports" />
              <Feature included text="API access" />
              <Feature included text="Priority email support" />
            </ul>
            <button className="w-full py-3 px-6 bg-[var(--nhs-blue)] text-white font-semibold rounded-xl hover:bg-[var(--nhs-dark-blue)] transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQ 
              question="Can I cancel my subscription anytime?"
              answer="Yes, you can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period."
            />
            <FAQ 
              question="Is there a discount for NHS organisations?"
              answer="Yes! NHS organisations can get 20% off Pro plans. Contact us for an NHS discount code."
            />
            <FAQ 
              question="What payment methods do you accept?"
              answer="We accept all major credit cards and can invoice NHS organisations directly."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function Feature({ included, text }: { included: boolean; text: string }) {
  return (
    <li className="flex items-center gap-3">
      {included ? (
        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-green-600" />
        </div>
      ) : (
        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center">
          <X className="w-3 h-3 text-slate-400" />
        </div>
      )}
      <span className={included ? 'text-slate-700' : 'text-slate-400'}>{text}</span>
    </li>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-slate-200 pb-6">
      <h3 className="font-semibold text-slate-900 mb-2">{question}</h3>
      <p className="text-slate-600">{answer}</p>
    </div>
  );
}