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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-base-300 via-base-100 to-base-300">
      <MagneticField />

      <div className="relative z-10">
        {/* Header */}
        <div className="navbar bg-base-100/80 backdrop-blur-lg shadow-2xl border-b border-primary/20 sticky top-0 z-50">
          <div className="navbar-start">
            <div className="flex items-center space-x-3">
              <div className="avatar placeholder">
                <div className="bg-gradient-to-br from-accent to-secondary text-neutral-content rounded-lg w-7 animate-pulse flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Credi<span className="badge badge-primary badge-lg mx-1 animate-bounce">Calc</span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="navbar-end">
            <div className="tabs tabs-boxed bg-base-200/50 backdrop-blur-sm p-1">
              <button
                onClick={() => setActiveScreen('dashboard')}
                className={`tab gap-2 transition-all duration-300 ${activeScreen === 'dashboard' ? 'tab-active shadow-lg shadow-primary/50' : 'hover:text-primary hover:scale-105'}`}
              >
                <LayoutDashboard className={`w-4 h-4 transition-transform ${activeScreen === 'dashboard' ? 'scale-110' : ''}`} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveScreen('loan')}
                className={`tab gap-2 transition-all duration-300 ${activeScreen === 'loan' ? 'tab-active shadow-lg shadow-accent/50' : 'hover:text-accent hover:scale-105'}`}
              >
                <Calculator className={`w-4 h-4 transition-transform ${activeScreen === 'loan' ? 'scale-110' : ''}`} />
                <span className="hidden sm:inline">Loan</span>
              </button>
              <button
                onClick={() => setActiveScreen('savings')}
                className={`tab gap-2 transition-all duration-300 ${activeScreen === 'savings' ? 'tab-active shadow-lg shadow-secondary/50' : 'hover:text-secondary hover:scale-105'}`}
              >
                <PiggyBank className={`w-4 h-4 transition-transform ${activeScreen === 'savings' ? 'scale-110' : ''}`} />
                <span className="hidden sm:inline">Savings</span>
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
