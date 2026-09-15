import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../../components/ui';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@swadha.edu' && password === 'admin') {
        sessionStorage.setItem('adminToken', 'mock-token');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. (Hint: admin@swadha.edu / admin)');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-indigo-600">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
            ADMIN PORTAL
          </CardTitle>
          <p className="text-slate-500 mt-2 text-sm">Sign in to manage machines and sessions.</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <Input
                label="Email"
                type="email"
                placeholder="admin@swadha.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
              size="lg"
              isLoading={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'LOGIN'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
