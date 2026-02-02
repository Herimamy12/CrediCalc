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
      <div className="bg-gradient-to-r from-primary to-accent/80 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl text-primary-foreground mb-2">Welcome back!</h2>
        <p className="text-primary-foreground/80">
          Here's an overview of your financial portfolio
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Loans Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Loans</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-primary">$293,000</p>
            <p className="text-sm text-muted-foreground">3 active loans</p>
          </div>
        </div>

        {/* Savings Balance Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-sm text-muted-foreground">Savings Balance</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-secondary">$12,600</p>
            <p className="text-sm text-secondary">+18% this month</p>
          </div>
        </div>

        {/* Monthly Payments Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Monthly Payments</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-primary">$2,880</p>
            <p className="text-sm text-muted-foreground">Due in 15 days</p>
          </div>
        </div>

        {/* Average Interest Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-muted-foreground">Avg Interest Rate</span>
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-purple-600">4.2%</p>
            <p className="text-sm text-muted-foreground">Across all loans</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="mb-4 text-primary">Savings Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#0d9488" 
                strokeWidth={3}
                dot={{ fill: '#0d9488', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Breakdown Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="mb-4 text-primary">Loan Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#0f172a" radius={[8, 8, 0, 0]} />
              <Bar dataKey="payment" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="mb-4 text-primary">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-primary">Savings Deposit</p>
                <p className="text-sm text-muted-foreground">Feb 1, 2026</p>
              </div>
            </div>
            <p className="text-secondary">+$1,200</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-primary">Loan Payment - Home</p>
                <p className="text-sm text-muted-foreground">Jan 28, 2026</p>
              </div>
            </div>
            <p className="text-primary">-$1,850</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-primary">Loan Payment - Auto</p>
                <p className="text-sm text-muted-foreground">Jan 25, 2026</p>
              </div>
            </div>
            <p className="text-primary">-$580</p>
          </div>
        </div>
      </div>
    </div>
  );
}
