import { useState } from 'react';
import { History, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, Button } from '../../components/ui';
import { mockUsageHistory } from '../../services/mockData';
import { Session } from '../../types';

export default function AdminUsageHistory() {
  const [history] = useState<Session[]>(mockUsageHistory);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(session => 
    session.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <History className="w-6 h-6 text-swadha-blue" />
            Usage History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review historical machine access logs.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white dark:bg-slate-800 hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" className="bg-swadha-dark hover:bg-slate-800 dark:bg-swadha-blue dark:hover:bg-blue-600 hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Machine, Student Name, or ID..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-swadha-blue transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Machine ID</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map(session => {
                const start = new Date(session.startTime);
                const end = session.endTime ? new Date(session.endTime) : new Date();
                const durationMins = Math.round((end.getTime() - start.getTime()) / 60000);
                
                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">{start.toLocaleDateString()}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">{session.studentName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{session.studentId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-medium">{session.machineId}</TableCell>
                    <TableCell>
                      {durationMins} mins
                    </TableCell>
                    <TableCell>
                      <Badge variant="neutral">Completed</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredHistory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                    No usage history found.
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
