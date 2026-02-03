import { useState } from 'react';
import { Calculator, RotateCcw, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

interface ProjectionData {
  year: number;
  contributions: number;
  interest: number;
  total: number;
}

export function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [interestRate, setInterestRate] = useState('5.5');
  const [duration, setDuration] = useState('10');
  const [finalBalance, setFinalBalance] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([]);

  const calculateSavings = () => {
    const initial = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100 / 12;
    const years = parseFloat(duration);
    const months = years * 12;

    if (initial < 0 || monthly < 0 || rate < 0 || months <= 0) {
      return;
    }

    const projection: ProjectionData[] = [];
    let balance = initial;
    let contributions = initial;
    let interest = 0;

    // Calculate for each year
    for (let year = 1; year <= years; year++) {
      const monthsInPeriod = year * 12;
      
      // Reset calculations
      balance = initial;
      contributions = initial;
      interest = 0;

      // Calculate month by month up to this year
      for (let month = 1; month <= monthsInPeriod; month++) {
        // Add monthly contribution
        balance += monthly;
        contributions += monthly;
        
        // Calculate interest for this month
        const monthlyInterest = balance * rate;
        balance += monthlyInterest;
        interest += monthlyInterest;
      }

      projection.push({
        year: year,
        contributions: contributions,
        interest: interest,
        total: balance,
      });
    }

    setProjectionData(projection);
    setFinalBalance(balance);
    setTotalContributions(contributions);
    setTotalInterest(interest);
  };

  const resetCalculator = () => {
    setInitialDeposit('5000');
    setMonthlyContribution('500');
    setInterestRate('5.5');
    setDuration('10');
    setFinalBalance(null);
    setTotalContributions(null);
    setTotalInterest(null);
    setProjectionData([]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="hero bg-gradient-to-r from-secondary via-accent to-primary rounded-box shadow-2xl hover:shadow-secondary/50 transition-all duration-500 border border-secondary/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="hero-content text-center py-10 relative z-10">
          <div>
            <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-base-content via-secondary to-accent bg-clip-text text-transparent">Savings Calculator</h2>
            <p className="text-lg opacity-90 max-w-md">
              Project your savings growth and visualize compound interest
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-secondary/20 hover:border-secondary/50 transition-all duration-500">
            <div className="card-body space-y-4">
              <h3 className="card-title text-secondary flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Savings Details
              </h3>

              {/* Initial Deposit */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Initial Deposit ($)</span>
                </label>
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="input input-bordered input-secondary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg"
                  placeholder="5000"
                />
              </div>

              {/* Monthly Contribution */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Monthly Contribution ($)</span>
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="input input-bordered input-secondary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg"
                  placeholder="500"
                />
              </div>

              {/* Interest Rate */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Annual Interest Rate (%)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="input input-bordered input-secondary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg"
                  placeholder="5.5"
                />
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Time Period (Years)</span>
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input input-bordered input-secondary w-full focus:scale-[1.02] transition-transform duration-200 font-bold text-lg"
                  placeholder="10"
                />
              </div>

              {/* Buttons */}
              <div className="card-actions flex-col pt-4">
                <button
                  onClick={calculateSavings}
                  className="btn btn-secondary btn-block gap-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-secondary/50"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </button>
                <button
                  onClick={resetCalculator}
                  className="btn btn-ghost btn-block gap-2 hover:scale-105 transition-all duration-300"
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
          {finalBalance !== null && (
            <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-100/80 backdrop-blur-sm border border-secondary/20 animate-scaleIn">
              <div className="stat hover:bg-secondary/10 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-secondary group-hover:scale-110 transition-transform duration-300 animate-bounce">
                  <TrendingUp className="w-8 h-8 drop-shadow-lg" />
                </div>
                <div className="stat-title">Final Balance</div>
                <div className="stat-value text-secondary text-2xl lg:text-3xl">
                  ${finalBalance.toFixed(2)}
                </div>
              </div>

              <div className="stat hover:bg-primary/10 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-primary group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 drop-shadow-lg" />
                </div>
                <div className="stat-title">Total Contributions</div>
                <div className="stat-value text-primary text-2xl lg:text-3xl">
                  ${totalContributions?.toFixed(2)}
                </div>
              </div>

              <div className="stat hover:bg-accent/10 transition-all duration-300 cursor-pointer group">
                <div className="stat-figure text-accent group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 drop-shadow-lg" />
                </div>
                <div className="stat-title">Interest Earned</div>
                <div className="stat-value text-accent text-2xl lg:text-3xl">
                  ${totalInterest?.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Projection Chart */}
          {projectionData.length > 0 && (
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-secondary/20 hover:border-secondary/50 transition-all duration-500 animate-slideInUp">
              <div className="card-body">
                <h3 className="card-title text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  Savings Growth Projection
                </h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInterestSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6b7280"
                    label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
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
                    dataKey="contributions" 
                    stackId="1"
                    stroke="#0f172a" 
                    fillOpacity={1} 
                    fill="url(#colorContributions)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="interest" 
                    stackId="1"
                    stroke="#0d9488" 
                    fillOpacity={1} 
                    fill="url(#colorInterestSavings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Total Growth Line Chart */}
          {projectionData.length > 0 && (
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-accent/20 hover:border-accent/50 transition-all duration-500 animate-slideInUp">
              <div className="card-body">
                <h3 className="card-title text-accent flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Total Balance Over Time
                </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6b7280"
                    label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
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
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#0d9488" 
                    strokeWidth={3}
                    dot={{ fill: '#0d9488', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Empty State */}
          {finalBalance === null && (
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-secondary/20 hover:border-secondary/50 transition-all duration-500">
              <div className="card-body items-center text-center py-12">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-secondary to-accent text-secondary-content rounded-full w-20 animate-pulse shadow-lg shadow-secondary/50">
                    <TrendingUp className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="card-title text-secondary mt-4">Ready to Project</h3>
                <p className="text-base-content/70 max-w-md">
                  Enter your savings details and click Calculate to see your projected growth and compound interest
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
