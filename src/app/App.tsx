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
    <div className="min-h-screen relative">
      <MagneticField />

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-primary/95 backdrop-blur-sm shadow-lg border-b border-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-primary" />
                </div>
                <h1 className="text-primary-foreground text-2xl">
                  Credi<span className="bg-primary rounded-sm px-2">Calc</span>
                </h1>
              </div>

              {/* Navigation */}
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveScreen('dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeScreen === 'dashboard'
                      ? 'bg-accent text-primary'
                      : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveScreen('loan')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeScreen === 'loan'
                      ? 'bg-accent text-primary'
                      : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>Loan Calculator</span>
                </button>
                <button
                  onClick={() => setActiveScreen('savings')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeScreen === 'savings'
                      ? 'bg-accent text-primary'
                      : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    }`}
                >
                  <PiggyBank className="w-4 h-4" />
                  <span>Savings Calculator</span>
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeScreen === 'dashboard' && <Dashboard />}
          {activeScreen === 'loan' && <LoanCalculator />}
          {activeScreen === 'savings' && <SavingsCalculator />}
        </main>
      </div>
    </div>
  );
}
