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
  const [loanAmount, setLoanAmount] = useState('8900000');
  const [interestRate, setInterestRate] = useState('20.0');
  const [duration, setDuration] = useState('4');
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
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="hero bg-base-200/5 backdrop-blur-[3px] rounded-box shadow-2xl border border-white/3 relative overflow-hidden group hover:border-accent/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="hero-content text-center py-10 relative z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-3 text-gray-50">Loan Calculator</h2>
            <p className="text-lg text-gray-50/80 max-w-md">
              Calculate your monthly payments and view amortization schedule
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-primary/40 transition-all duration-500">
            <div className="card-body space-y-4">
              <h3 className="card-title text-accent flex items-center gap-2">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                Loan Details
              </h3>

              {/* Loan Amount */}
              <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-gray-50/500">Loan Amount (Ariary)</span>
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                    className="input input-bordered input-primary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg bg-slate-900 border-slate-700 text-slate-100"
                  placeholder="250000"
                />
              </div>

              {/* Interest Rate */}
              <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-gray-50/500">Annual Interest Rate (%)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                    className="input input-bordered input-primary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg bg-slate-900 border-slate-700 text-slate-100"
                  placeholder="4.5"
                />
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-gray-50/500">Loan Duration (Years)</span>
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                    className="input input-bordered input-primary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg bg-slate-900 border-slate-700 text-slate-100"
                  placeholder="30"
                />
              </div>

              {/* Buttons */}
              <div className="card-actions flex-col pt-4">
                <button
                  onClick={calculateLoan}
                  className="btn btn-primary btn-block gap-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </button>
                <button
                  onClick={resetCalculator}
                  className="btn btn-outline btn-block gap-2 hover:scale-105 transition-all duration-300"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          {monthlyPayment !== null && (
            <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-200/5 backdrop-blur-[3px] border border-white/3 animate-scaleIn">
              <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-error group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-8 h-8 drop-shadow-lg" />
                </div>
                  <div className="stat-title text-slate-400">Monthly Payment</div>
                <div className="stat-value text-error text-2xl lg:text-3xl">
                  ${monthlyPayment.toFixed(2)}
                </div>
              </div>

              <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-success group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-8 h-8 drop-shadow-lg" />
                </div>
                  <div className="stat-title text-slate-400">Total Interest</div>
                <div className="stat-value text-success text-2xl lg:text-3xl">
                  ${totalInterest?.toFixed(2)}
                </div>
              </div>

              <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-accent group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-8 h-8 drop-shadow-lg" />
                </div>
                  <div className="stat-title text-slate-400">Total Amount</div>
                <div className="stat-value text-accent text-2xl lg:text-3xl">
                  ${(parseFloat(loanAmount) + (totalInterest || 0)).toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Amortization Chart */}
          {amortizationData.length > 0 && (
            <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-accent/40 transition-all duration-500 animate-slideInUp">
              <div className="card-body">
                <h3 className="card-title text-accent flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                  Amortization Schedule
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={amortizationData}>
                    <defs>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#64748b"
                        label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="principal" 
                      stackId="1"
                        stroke="#2563eb" 
                      fillOpacity={1} 
                      fill="url(#colorPrincipal)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interest" 
                      stackId="1"
                        stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorInterest)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Empty State */}
          {monthlyPayment === null && (
            <div className="card bg-base-100/2 backdrop-blur-none shadow-2xl border border-primary/10 hover:border-primary/40 transition-all duration-500">
              <div className="card-body items-center text-center py-12">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-primary to-accent text-primary-content rounded-full w-20 animate-pulse shadow-lg shadow-primary/50">
                    <Calculator className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="card-title text-primary mt-4">Ready to Calculate</h3>
                <p className="text-gray-50/70 max-w-md">
                  Enter your loan details and click Calculate to see your monthly payment and amortization schedule
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
