import React, { useEffect, useState } from 'react';
import { 
  Monitor, 
  CheckCircle2, 
  Activity, 
  Wrench, 
  AlertTriangle 
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui';
import { DashboardStats, MachineStatus } from '../../types';
import { mockMachines, mockSessions, mockIssues } from '../../services/mockData';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  // Calculate mock stats
  useEffect(() => {
    // In a real app, this would be an API call
    const activeSessionsCount = mockSessions.filter(s => s.status === 'ACTIVE').length;
    const issuesToday = mockIssues.length; // Simplified for mock
    
    setStats({
      totalMachines: mockMachines.length,
      available: mockMachines.filter(m => m.status === MachineStatus.AVAILABLE).length,
      inUse: mockMachines.filter(m => m.status === MachineStatus.IN_USE).length,
      underMaintenance: mockMachines.filter(m => m.status === MachineStatus.UNDER_MAINTENANCE).length,
      activeSessions: activeSessionsCount,
      issuesReportedToday: issuesToday
    });
  }, []);

  if (!stats) return <div className="p-8">Loading Dashboard...</div>;

  const statCards = [
    { title: 'Total Machines', value: stats.totalMachines, icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Available', value: stats.available, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'In Use', value: stats.inUse, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Under Maintenance', value: stats.underMaintenance, icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Active Sessions', value: stats.activeSessions, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Issues Today', value: stats.issuesReportedToday, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Machine Overview</h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {mockMachines.map(machine => {
              let dotColor = 'bg-slate-300';
              if (machine.status === MachineStatus.AVAILABLE) dotColor = 'bg-green-500';
              if (machine.status === MachineStatus.IN_USE) dotColor = 'bg-indigo-500';
              if (machine.status === MachineStatus.UNDER_MAINTENANCE) dotColor = 'bg-amber-500';
              
              return (
                <div key={machine.id} className="border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center bg-slate-50 gap-2 hover:border-slate-300 transition-colors cursor-default">
                  <Monitor className={`w-6 h-6 ${machine.status === MachineStatus.UNDER_MAINTENANCE ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-700">{machine.id.replace('MACHINE-', 'M-')}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">{machine.status.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
