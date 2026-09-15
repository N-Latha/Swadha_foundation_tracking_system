import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select } from '../../components/ui';
import { Purpose } from '../../types';
import { sessionService } from '../../services/sessionService';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [purpose, setPurpose] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read-only machine ID as per requirements
  const machineId = 'MACHINE-001';

  const purposeOptions = [
    { label: 'Skilling Course', value: Purpose.SKILLING_COURSE },
    { label: 'Zoom Meeting', value: Purpose.ZOOM_MEETING },
    { label: 'College Project', value: Purpose.COLLEGE_PROJECT },
    { label: 'Others', value: Purpose.OTHERS },
  ];

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!studentId.trim()) {
      setError('Please enter your Swadha ID.');
      return;
    }
    if (!purpose) {
      setError('Please select a purpose.');
      return;
    }

    setIsLoading(true);
    try {
      const session = await sessionService.startSession(studentId, machineId, purpose as Purpose);
      
      // Store session data locally for the frontend flow
      sessionStorage.setItem('currentSession', JSON.stringify(session));
      
      navigate('/student/session');
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <Monitor className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
            COMMON MACHINE
            <span className="block text-blue-600 font-extrabold text-3xl mt-1">USAGE PORTAL</span>
          </CardTitle>
          <p className="text-slate-500 mt-2 text-sm">Please check in to start your session.</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleStartSession} className="space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Input
              label="Machine ID"
              value={machineId}
              disabled
              className="bg-slate-100 font-mono text-slate-600 cursor-not-allowed"
            />
            
            <Input
              label="Swadha ID / Student ID"
              placeholder="Enter your Swadha ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            
            <Select
              label="Purpose of Usage"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              options={purposeOptions}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="lg"
              isLoading={isLoading}
            >
              {isLoading ? 'Starting Session...' : 'START SESSION'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
