import { useState } from 'react';
import { AlertTriangle, Search, CheckCircle } from 'lucide-react';
import { Card, CardContent, Modal, Button, Select, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from '../../components/ui';
import { mockIssues } from '../../services/mockData';
import { Issue } from '../../types';

export default function AdminIssues() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'PENDING' | 'RESOLVED'>('PENDING');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.machineId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openResolveModal = (issue: Issue) => {
    setSelectedIssue(issue);
    setUpdateStatus(issue.status);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedIssue) return;
    
    setIssues(issues.map(i => 
      i.id === selectedIssue.id ? { ...i, status: updateStatus } : i
    ));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Issue Tracking
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review and resolve reported hardware issues.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 flex flex-col sm:flex-row gap-4 border-b border-slate-100 dark:border-slate-800/50">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Machine ID..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-swadha-blue transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-swadha-blue transition-colors"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Issues</option>
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine ID</TableHead>
                <TableHead>Issue Description</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map(issue => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono font-semibold">{issue.machineId}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate" title={issue.description}>
                      {issue.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    {new Date(issue.reportedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.status === 'RESOLVED' ? 'success' : 'error'}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => openResolveModal(issue)}
                      className="text-swadha-blue hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredIssues.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CheckCircle className="w-8 h-8 text-green-400 dark:text-green-500/50" />
                      <p>No issues found. Everything is looking good!</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Manage Issue"
      >
        {selectedIssue && (
          <div className="space-y-4">
            <div className="text-sm bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Machine:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-white">{selectedIssue.machineId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Reported:</span>
                <span className="text-slate-800 dark:text-white">{new Date(selectedIssue.reportedAt).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">Description:</span>
                <p className="text-slate-800 dark:text-white">{selectedIssue.description}</p>
              </div>
            </div>
            
            <div className="pt-2 space-y-4">
              <Select
                label="Resolution Status"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value as 'PENDING' | 'RESOLVED')}
                options={[
                  { label: 'Pending', value: 'PENDING' },
                  { label: 'Resolved', value: 'RESOLVED' },
                ]}
              />

              <Button onClick={handleUpdate} className="w-full mt-4">
                Update Issue
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
