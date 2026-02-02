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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent/80 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl text-white mb-2">Savings Calculator</h2>
        <p className="text-white/90">
          Project your savings growth and visualize compound interest
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-6">
            <h3 className="text-primary mb-4">Savings Details</h3>

            {/* Initial Deposit */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Initial Deposit ($)
              </label>
              <input
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                placeholder="5000"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                placeholder="500"
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
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                placeholder="5.5"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-sm text-muted-foreground">
                Time Period (Years)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                placeholder="10"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={calculateSavings}
                className="w-full bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
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
          {finalBalance !== null && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Final Balance</p>
                </div>
                <p className="text-3xl text-secondary">
                  ${finalBalance.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                </div>
                <p className="text-3xl text-primary">
                  ${totalContributions?.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                </div>
                <p className="text-3xl text-accent">
                  ${totalInterest?.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Projection Chart */}
          {projectionData.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="mb-4 text-primary">Savings Growth Projection</h3>
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
          )}

          {/* Total Growth Line Chart */}
          {projectionData.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="mb-4 text-primary">Total Balance Over Time</h3>
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
          )}

          {/* Empty State */}
          {finalBalance === null && (
            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-primary mb-2">Ready to Project</h3>
              <p className="text-muted-foreground">
                Enter your savings details and click Calculate to see your projected growth and compound interest
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
