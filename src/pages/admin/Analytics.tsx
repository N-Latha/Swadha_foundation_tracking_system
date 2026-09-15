import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui';
import { Skeleton } from '../../components/Skeleton';
import { 
  AreaChart, Area, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Mock Data
const usageData = [
  { name: 'Mon', usage: 40 },
  { name: 'Tue', usage: 30 },
  { name: 'Wed', usage: 45 },
  { name: 'Thu', usage: 50 },
  { name: 'Fri', usage: 65 },
  { name: 'Sat', usage: 20 },
  { name: 'Sun', usage: 15 },
];

const issueData = [
  { name: 'Hardware', value: 400 },
  { name: 'Software', value: 300 },
  { name: 'Network', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#2ea3f2', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminAnalytics() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed breakdown of machine usage and reported issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Machine Usage</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2ea3f2" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2ea3f2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="usage" stroke="#2ea3f2" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issue Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-72">
                <Skeleton className="h-48 w-48 rounded-full" />
              </div>
            ) : (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {issueData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
