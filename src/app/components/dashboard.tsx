import { DollarSign, TrendingUp, CreditCard, Percent } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for demonstration
const savingsGrowthData = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 6200 },
  { month: 'Mar', amount: 7500 },
  { month: 'Apr', amount: 9100 },
  { month: 'May', amount: 10800 },
  { month: 'Jun', amount: 12600 },
];

const loanBreakdownData = [
  { name: 'Personal Loan', amount: 15000, payment: 450 },
  { name: 'Auto Loan', amount: 28000, payment: 580 },
  { name: 'Home Loan', amount: 250000, payment: 1850 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="hero bg-base-200/20 backdrop-blur-md rounded-box shadow-2xl border border-white/10 relative overflow-hidden group hover:border-accent/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="hero-content text-center py-10 relative z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-3 text-base-content">Welcome back!</h2>
            <p className="text-lg text-base-content/80 max-w-md">
              Here's an overview of your financial portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-200/20 backdrop-blur-md border border-white/10">
        {/* Total Loans Card */}
        <div className="stat hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-primary group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-8 h-8 drop-shadow-lg" />
          </div>
            <div className="stat-title text-slate-400">Total Loans</div>
          <div className="stat-value text-primary text-3xl lg:text-4xl">$293K</div>
            <div className="stat-desc font-semibold text-slate-500">3 active loans</div>
        </div>

        {/* Savings Balance Card */}
        <div className="stat hover:bg-base-300 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-success group-hover:scale-110 transition-transform duration-300 animate-bounce">
            <TrendingUp className="w-8 h-8 drop-shadow-lg" />
          </div>
            <div className="stat-title text-slate-400">Savings Balance</div>
          <div className="stat-value text-success text-3xl lg:text-4xl">$12.6K</div>
            <div className="stat-desc text-slate-300 font-semibold">↗︎ 18% this month</div>
        </div>

        {/* Monthly Payments Card */}
        <div className="stat hover:bg-base-300 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-accent group-hover:scale-110 transition-transform duration-300">
            <DollarSign className="w-8 h-8 drop-shadow-lg" />
          </div>
            <div className="stat-title text-slate-400">Monthly Payments</div>
          <div className="stat-value text-accent text-3xl lg:text-4xl">$2,880</div>
            <div className="stat-desc font-semibold text-slate-500">Due in 15 days</div>
        </div>

        {/* Average Interest Card */}
        <div className="stat hover:bg-base-300 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-info group-hover:scale-110 transition-transform duration-300">
            <Percent className="w-8 h-8 drop-shadow-lg" />
          </div>
            <div className="stat-title text-slate-400">Avg Interest Rate</div>
          <div className="stat-value text-info text-3xl lg:text-4xl">4.2%</div>
            <div className="stat-desc font-semibold text-slate-500">Across all loans</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Growth Chart */}
        <div className="card bg-base-200/20 backdrop-blur-md shadow-2xl border border-white/10 hover:border-success/40 transition-all duration-500 group">
          <div className="card-body">
            <h3 className="card-title text-success flex items-center gap-2">
              <span className="w-3 h-3 bg-success rounded-full animate-pulse"></span>
              Savings Growth Trend
            </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                 stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#0d9488', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Loan Breakdown Chart */}
        <div className="card bg-base-200/20 backdrop-blur-md shadow-2xl border border-white/10 hover:border-primary/40 transition-all duration-500 group">
          <div className="card-body">
            <h3 className="card-title text-primary flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              Loan Breakdown
            </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
              <Bar dataKey="payment" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-200/20 backdrop-blur-md shadow-2xl border border-white/10 hover:border-accent/40 transition-all duration-500">
        <div className="card-body">
          <h3 className="card-title text-base-content flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="alert alert-success shadow-lg hover:shadow-success/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-success/30 bg-success/10">
              <div className="flex items-center gap-3 w-full">
                <div className="avatar placeholder">
                    <div className="bg-emerald-600 text-slate-100 rounded-full w-10 animate-pulse">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">Savings Deposit</h4>
                    <p className="text-sm text-slate-500">Feb 1, 2026</p>
                </div>
                  <div className="badge badge-lg font-bold bg-emerald-600 text-slate-100">+$1,200</div>
              </div>
            </div>
            
            <div className="alert shadow-lg hover:shadow-primary/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-base-300 bg-base-300/50">
              <div className="flex items-center gap-3 w-full">
                <div className="avatar placeholder">
                    <div className="bg-blue-600 text-slate-100 rounded-full w-10">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">Loan Payment - Home</h4>
                    <p className="text-sm text-slate-500">Jan 28, 2026</p>
                </div>
                <div className="badge badge-ghost badge-lg font-bold">-$1,850</div>
              </div>
            </div>
            
            <div className="alert shadow-lg hover:shadow-accent/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-accent/20 bg-accent/5">
              <div className="flex items-center gap-3 w-full">
                <div className="avatar placeholder">
                    <div className="bg-cyan-600 text-slate-100 rounded-full w-10">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">Loan Payment - Auto</h4>
                    <p className="text-sm text-slate-500">Jan 25, 2026</p>
                </div>
                <div className="badge badge-ghost badge-lg font-bold">-$580</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
