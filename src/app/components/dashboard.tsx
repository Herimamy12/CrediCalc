import { DollarSign, TrendingUp, CreditCard, Percent, Calendar, Calculator } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

// Loan calculation with amortization
const loanPrincipal = 8_900_000; // Ariary
const annualInterestRate = 0.20; // 20% per year
const monthlyInterestRate = annualInterestRate / 12;
const loanDurationYears = 4;
const loanDurationMonths = loanDurationYears * 12;
const startDate = new Date('2024-01-01');

// Calculate monthly payment using amortization formula
const monthlyPayment = loanPrincipal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanDurationMonths)) / 
                       (Math.pow(1 + monthlyInterestRate, loanDurationMonths) - 1);

// Generate amortization schedule
const generateAmortizationSchedule = () => {
  let remainingBalance = loanPrincipal;
  let totalInterestPaid = 0;
  const schedule = [];

  for (let month = 1; month <= loanDurationMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;

    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + month);

    schedule.push({
      month,
      date: currentDate,
      monthLabel: currentDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      interestPayment,
      principalPayment,
      remainingBalance: Math.max(0, remainingBalance),
      totalPaid: loanPrincipal - remainingBalance,
      totalInterestPaid
    });
  }

  return schedule;
};

const amortizationSchedule = generateAmortizationSchedule();

// Data for recent months chart (last 3 months)
const currentDate = new Date(); // Current date (dynamic)
const currentMonthIndex = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
const recentMonthsData = amortizationSchedule
  .slice(Math.max(0, currentMonthIndex - 2), currentMonthIndex + 1)
  .map(item => ({
    month: item.monthLabel,
    remainingPrincipal: Math.round(item.remainingBalance),
    paidPrincipal: Math.round(item.totalPaid)
  }));

// Current month summary
const currentMonthData = amortizationSchedule[currentMonthIndex] || amortizationSchedule[amortizationSchedule.length - 1];

export function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value) + ' Ar';
  };

  // Dynamic date formatting
  const loanStartFormatted = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const loanEndDate = new Date(startDate);
  loanEndDate.setMonth(startDate.getMonth() + loanDurationMonths);
  const loanEndFormatted = loanEndDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentMonthFormatted = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="hero bg-base-200/5 backdrop-blur-[3px] rounded-box shadow-2xl border border-white/3 relative overflow-hidden group hover:border-accent/40 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="hero-content text-center py-10 relative z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-3 text-gray-100">Welcome back!</h2>
            <p className="text-lg text-gray-100/80 max-w-md">
              Here's an overview of your financial portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Détails du Prêt */}
      <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-primary/40 transition-all duration-500">
        <div className="card-body">
          <h3 className="card-title text-primary flex items-center gap-2 mb-4">
            <Calculator className="w-6 h-6" />
            Loan Details ({loanStartFormatted})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat bg-gray-700/10 rounded-lg p-4 border border-gray-700/20 hover:border-gray-700/100 transition-all">
              <div className="stat-title text-gray-100/70">Initial Principal</div>
              <div className="stat-value text-gray text-2xl">{formatCurrency(loanPrincipal)}</div>
              <div className="stat-desc text-gray-100/60">Borrowed amount</div>
            </div>
            <div className="stat bg-error/10 rounded-lg p-4 border border-error/20 hover:border-error/40 transition-all">
              <div className="stat-title text-gray-100/70">Interest Rate</div>
              <div className="stat-value text-error text-2xl">20%</div>
              <div className="stat-desc text-gray-100/60">Per year</div>
            </div>
            <div className="stat bg-info/10 rounded-lg p-4 border border-info/20 hover:border-info/40 transition-all">
              <div className="stat-title text-gray-100/70">Duration</div>
              <div className="stat-value text-info text-2xl">4 Years</div>
              <div className="stat-desc text-gray-100/60">{loanDurationMonths} months</div>
            </div>
            <div className="stat bg-accent/10 rounded-lg p-4 border border-accent/20 hover:border-accent/40 transition-all">
              <div className="stat-title text-gray-100/70">Monthly Payment</div>
              <div className="stat-value text-accent text-2xl">{formatCurrency(monthlyPayment)}</div>
              <div className="stat-desc text-gray-100/60">To pay each month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Month Summary */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-200/5 backdrop-blur-[3px] border border-white/3">
        {/* Remaining Principal */}
        <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-slate-400 group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-8 h-8 drop-shadow-lg" />
          </div>
          <div className="stat-title text-slate-400">Remaining Principal</div>
          <div className="stat-value text-slate-300 text-3xl lg:text-4xl">{formatCurrency(currentMonthData.remainingBalance)}</div>
          <div className="stat-desc font-semibold text-slate-500">{currentMonthFormatted}</div>
        </div>

        {/* Paid Principal */}
        <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-8 h-8 drop-shadow-lg" />
          </div>
          <div className="stat-title text-slate-400">Paid Principal</div>
          <div className="stat-value text-blue-400 text-3xl lg:text-4xl">{formatCurrency(currentMonthData.totalPaid)}</div>
          <div className="stat-desc text-slate-300 font-semibold">
            {Math.round((currentMonthData.totalPaid / loanPrincipal) * 100)}% of loan
          </div>
        </div>

        {/* Total Interest Paid */}
        <div className="stat hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <div className="stat-figure text-error group-hover:scale-110 transition-transform duration-300">
            <Percent className="w-8 h-8 drop-shadow-lg" />
          </div>
          <div className="stat-title text-slate-400">Total Interest Paid</div>
          <div className="stat-value text-error text-3xl lg:text-4xl">{formatCurrency(currentMonthData.totalInterestPaid)}</div>
          <div className="stat-desc font-semibold text-slate-500">Since beginning</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Principal Evolution */}
        <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-primary/40 transition-all duration-500 group">
          <div className="card-body">
            <h3 className="card-title text-primary flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              Principal Evolution (Recent Months)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={recentMonthsData}>
                <defs>
                  <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis 
                  stroke="#6b7280" 
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="paidPrincipal"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorPaid)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="remainingPrincipal"
                  stroke="#64748b"
                  fillOpacity={1}
                  fill="url(#colorRemaining)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Bar Chart */}
        <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-blue-400/40 transition-all duration-500 group">
          <div className="card-body">
            <h3 className="card-title text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
              Monthly Repayment Progress
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={recentMonthsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis 
                  stroke="#6b7280"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="paidPrincipal" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="remainingPrincipal" fill="#64748b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="card bg-base-200/5 backdrop-blur-[3px] shadow-2xl border border-white/3 hover:border-accent/40 transition-all duration-500">
        <div className="card-body">
          <h3 className="card-title text-gray-100 flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6" />
            Repayment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Loan start:</span>
                <span className="font-bold">{loanStartFormatted}</span>
              </div>
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Expected end:</span>
                <span className="font-bold">{loanEndFormatted}</span>
              </div>
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Months elapsed:</span>
                <span className="font-bold">{currentMonthIndex + 1} / {loanDurationMonths}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Total to repay:</span>
                <span className="font-bold text-error">{formatCurrency(monthlyPayment * loanDurationMonths)}</span>
              </div>
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Total interest over 4 years:</span>
                <span className="font-bold text-slate-300">{formatCurrency((monthlyPayment * loanDurationMonths) - loanPrincipal)}</span>
              </div>
              <div className="flex justify-between p-3 bg-base-300/30 rounded-lg hover:bg-base-300/50 transition-all">
                <span className="text-gray-100/70">Progress:</span>
                <span className="font-bold text-blue-400">{Math.round(((currentMonthIndex + 1) / loanDurationMonths) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
