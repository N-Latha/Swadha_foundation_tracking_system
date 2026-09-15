import { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { Card, CardContent, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, Button } from '../../components/ui';
import { mockSessions } from '../../services/mockData';
import { Session } from '../../types';

export default function AdminSessions() {
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setActiveSessions(mockSessions.filter(s => s.status === 'ACTIVE'));
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-500" />
            Active Sessions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monitor currently ongoing student machine usage.</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={fetchSessions}
          disabled={isRefreshing}
          className="bg-white dark:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>Student Details</TableHead>
                <TableHead>Machine ID</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map(session => (
                <TableRow key={session.id}>
                  <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {session.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white">{session.studentName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{session.studentId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono font-medium">{session.machineId}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="animate-pulse">
                      Live
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {activeSessions.length === 0 && !isRefreshing && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Activity className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                      <p>No active sessions right now.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
