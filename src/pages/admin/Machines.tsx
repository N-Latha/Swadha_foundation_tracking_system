import { useState } from 'react';
import { Search, Monitor, CheckCircle } from 'lucide-react';
import { Card, CardContent, Modal, Button, Select, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from '../../components/ui';
import { mockMachines } from '../../services/mockData';
import { Machine, MachineStatus } from '../../types';

export default function AdminMachines() {
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal & Toast State
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<MachineStatus>(MachineStatus.AVAILABLE);
  const [showToast, setShowToast] = useState(false);

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (machine: Machine) => {
    setSelectedMachine(machine);
    setUpdateStatus(machine.status);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedMachine) return;
    
    setMachines(machines.map(m => 
      m.id === selectedMachine.id ? { ...m, status: updateStatus } : m
    ));
    
    setIsModalOpen(false);
    
    // Show Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-8 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Machine updated successfully!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Monitor className="w-6 h-6 text-swadha-blue" />
            Machines
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and monitor hardware statuses.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Machine ID..."
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
              <option value="ALL">All Statuses</option>
              <option value={MachineStatus.AVAILABLE}>Available</option>
              <option value={MachineStatus.IN_USE}>In Use</option>
              <option value={MachineStatus.UNDER_MAINTENANCE}>Under Maintenance</option>
              <option value={MachineStatus.DISABLED}>Disabled</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Machine ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMachines.map(machine => {
                let badgeVariant: 'success' | 'default' | 'warning' | 'neutral' = 'neutral';
                if (machine.status === MachineStatus.AVAILABLE) badgeVariant = 'success';
                if (machine.status === MachineStatus.IN_USE) badgeVariant = 'default';
                if (machine.status === MachineStatus.UNDER_MAINTENANCE) badgeVariant = 'warning';

                return (
                  <TableRow key={machine.id}>
                    <TableCell className="font-mono font-medium">{machine.id}</TableCell>
                    <TableCell>
                      <Badge variant={badgeVariant}>
                        {machine.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditModal(machine)}
                        className="text-swadha-blue hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        Edit Status
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredMachines.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-slate-500 dark:text-slate-400">
                    No machines found matching your filters.
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
        title="Edit Machine Status"
      >
        {selectedMachine && (
          <div className="space-y-4">
            <div className="text-sm bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Machine ID:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-white">{selectedMachine.id}</span>
            </div>
            
            <div className="pt-2 space-y-4">
              <Select
                label="New Status"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value as MachineStatus)}
                options={[
                  { label: 'Available', value: MachineStatus.AVAILABLE },
                  { label: 'In Use', value: MachineStatus.IN_USE },
                  { label: 'Under Maintenance', value: MachineStatus.UNDER_MAINTENANCE },
                  { label: 'Disabled', value: MachineStatus.DISABLED },
                ]}
              />

              <Button onClick={handleUpdate} className="w-full mt-4">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
