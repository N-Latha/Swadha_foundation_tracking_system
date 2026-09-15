import { useEffect, useState } from 'react';
import { 
  Monitor, 
  CheckCircle2, 
  Activity, 
  Wrench, 
  AlertTriangle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui';
import { DashboardStats, MachineStatus } from '../../types';
import { mockMachines, mockSessions, mockIssues } from '../../services/mockData';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  useEffect(() => {
    const activeSessionsCount = mockSessions.filter(s => s.status === 'ACTIVE').length;
    const issuesToday = mockIssues.length;
    
    setStats({
      totalMachines: mockMachines.length,
      available: mockMachines.filter(m => m.status === MachineStatus.AVAILABLE).length,
      inUse: mockMachines.filter(m => m.status === MachineStatus.IN_USE).length,
      underMaintenance: mockMachines.filter(m => m.status === MachineStatus.UNDER_MAINTENANCE).length,
      activeSessions: activeSessionsCount,
      issuesReportedToday: issuesToday
    });
  }, []);

  if (!stats) return <div className="p-8 text-slate-500 dark:text-slate-400">Loading Dashboard...</div>;

  const statCards = [
    { title: 'Total Machines', value: stats.totalMachines, icon: Monitor, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Available', value: stats.available, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { title: 'In Use', value: stats.inUse, icon: Activity, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { title: 'Under Maintenance', value: stats.underMaintenance, icon: Wrench, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'Active Sessions', value: stats.activeSessions, icon: Activity, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { title: 'Issues Today', value: stats.issuesReportedToday, icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time metrics and system status.</p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout for Data Density */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Machine Status Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="py-4">
            <CardTitle className="text-base">Machine Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMachines.slice(0, 5).map(machine => {
                  let badgeVariant: 'success' | 'default' | 'warning' | 'neutral' = 'neutral';
                  if (machine.status === MachineStatus.AVAILABLE) badgeVariant = 'success';
                  if (machine.status === MachineStatus.IN_USE) badgeVariant = 'default';
                  if (machine.status === MachineStatus.UNDER_MAINTENANCE) badgeVariant = 'warning';
                  
                  return (
                    <TableRow key={machine.id}>
                      <TableCell className="font-mono font-medium">{machine.id.replace('MACHINE-', 'M-')}</TableCell>
                      <TableCell>
                        <Badge variant={badgeVariant}>
                          {machine.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 dark:text-slate-400 text-sm">Lab {Math.floor(Math.random() * 3) + 1}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Issues Overview */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-base">Recent Issues</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {mockIssues.slice(0, 4).map(issue => (
              <div key={issue.id} className="flex flex-col border-b border-slate-100 dark:border-slate-700/50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{issue.machineId.replace('MACHINE-', 'M-')}</span>
                  <span className="text-[10px] text-slate-400">{new Date(issue.reportedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{issue.description}</p>
                <div className="mt-2">
                  <Badge variant={issue.status === 'RESOLVED' ? 'success' : 'error'}>{issue.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
