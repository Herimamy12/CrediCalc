import { useState } from 'react';
import { Calculator, RotateCcw, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AmortizationData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [duration, setDuration] = useState('30');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>([]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(duration) * 12;

    if (principal <= 0 || rate <= 0 || payments <= 0) {
      return;
    }

    // Monthly payment calculation
    const monthlyPmt = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    setMonthlyPayment(monthlyPmt);

    // Calculate amortization schedule
    let balance = principal;
    const schedule: AmortizationData[] = [];
    let totalInt = 0;

    // Sample every 12 months for chart readability
    for (let month = 1; month <= payments; month++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPmt - interestPayment;
      balance -= principalPayment;
      totalInt += interestPayment;

      if (month % 12 === 0 || month === 1) {
        schedule.push({
          month: month,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    setAmortizationData(schedule);
    setTotalInterest(totalInt);
  };

  const resetCalculator = () => {
    setLoanAmount('250000');
    setInterestRate('4.5');
    setDuration('30');
    setMonthlyPayment(null);
    setTotalInterest(null);
    setAmortizationData([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent/80 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl text-primary-foreground mb-2">Loan Calculator</h2>
        <p className="text-primary-foreground/80">
          Calculate your monthly payments and view amortization schedule
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-6">
            <h3 className="text-primary mb-4">Loan Details</h3>

            {/* Loan Amount */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="250000"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="4.5"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Loan Duration (Years)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="30"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={calculateLoan}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate</span>
              </button>
              <button
                onClick={resetCalculator}
                className="w-full bg-gray-100 text-primary px-6 py-3 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          {monthlyPayment !== null && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                </div>
                <p className="text-3xl text-primary">
                  ${monthlyPayment.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                </div>
                <p className="text-3xl text-secondary">
                  ${totalInterest?.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
                <p className="text-3xl text-accent">
                  ${(parseFloat(loanAmount) + (totalInterest || 0)).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Amortization Chart */}
          {amortizationData.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="mb-4 text-primary">Amortization Schedule</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={amortizationData}>
                  <defs>
                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="principal" 
                    stackId="1"
                    stroke="#0f172a" 
                    fillOpacity={1} 
                    fill="url(#colorPrincipal)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="interest" 
                    stackId="1"
                    stroke="#0d9488" 
                    fillOpacity={1} 
                    fill="url(#colorInterest)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Empty State */}
          {monthlyPayment === null && (
            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-primary mb-2">Ready to Calculate</h3>
              <p className="text-muted-foreground">
                Enter your loan details and click Calculate to see your monthly payment and amortization schedule
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
