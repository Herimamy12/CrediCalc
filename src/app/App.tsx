import { useState } from 'react';
import { MagneticField } from '@/app/components/magnetic-field';
import { Dashboard } from '@/app/components/dashboard';
import { LoanCalculator } from '@/app/components/loan-calculator';
import { SavingsCalculator } from '@/app/components/savings-calculator';
import { LayoutDashboard, Layers, Calculator, PiggyBank } from 'lucide-react';

type Screen = 'dashboard' | 'loan' | 'savings';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <MagneticField />

      <div className="relative z-10">
        {/* Header */}
        <div className="navbar bg-base-100/5 backdrop-blur-[3px] shadow-2xl border-b border-white/3 sticky top-0 z-50">
          <div className="navbar-start">
            <div className="flex items-center space-x-3">
              <div className="avatar placeholder">
                <div className="bg-gradient-to-br from-accent to-info text-base-100 rounded-lg w-8 animate-pulse flex items-center justify-center shadow-lg shadow-accent/20">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-base-content">
                Credi<span className="text-2xl font-bold text-accent">Calc</span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="navbar-end">
            <div className="tabs tabs-boxed bg-base-200/5 backdrop-blur-[3px] p-1 gap-1 border border-white/3">
              <button
                onClick={() => setActiveScreen('dashboard')}
                className={`tab gap-2 transition-all duration-300 px-4 ${activeScreen === 'dashboard'
                  ? 'tab-active bg-primary text-primary-content shadow-lg shadow-primary/40'
                  : 'text-base-content/60 hover:text-primary hover:scale-105'
                  }`}
              >
                <LayoutDashboard className={`w-4 h-4 transition-transform ${activeScreen === 'dashboard' ? 'scale-110' : ''
                  }`} />
                <span className="hidden sm:inline font-semibold">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveScreen('loan')}
                className={`tab gap-2 transition-all duration-300 px-4 ${activeScreen === 'loan'
                  ? 'tab-active bg-accent text-base-100 shadow-lg shadow-accent/40'
                  : 'text-base-content/60 hover:text-accent hover:scale-105'
                  }`}
              >
                <Calculator className={`w-4 h-4 transition-transform ${activeScreen === 'loan' ? 'scale-110' : ''
                  }`} />
                <span className="hidden sm:inline font-semibold">Loan</span>
              </button>
              <button
                onClick={() => setActiveScreen('savings')}
                className={`tab gap-2 transition-all duration-300 px-4 ${activeScreen === 'savings'
                  ? 'tab-active bg-success text-base-100 shadow-lg shadow-success/40'
                  : 'text-base-content/60 hover:text-success hover:scale-105'
                  }`}
              >
                <PiggyBank className={`w-4 h-4 transition-transform ${activeScreen === 'savings' ? 'scale-110' : ''
                  }`} />
                <span className="hidden sm:inline font-semibold">Savings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fadeIn">
            {activeScreen === 'dashboard' && <Dashboard />}
            {activeScreen === 'loan' && <LoanCalculator />}
            {activeScreen === 'savings' && <SavingsCalculator />}
          </div>
        </main>
      </div>
    </div>
  );
}
