
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import StudentLogin from './pages/student/Login';
import ActiveSession from './pages/student/Session';
import MachineCondition from './pages/student/Condition';
import SessionCompleted from './pages/student/Completed';
import ReportIssue from './pages/student/ReportIssue';

import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMachines from './pages/admin/Machines';
import AdminSessions from './pages/admin/Sessions';
import AdminIssues from './pages/admin/Issues';
import AdminUsageHistory from './pages/admin/UsageHistory';
import AdminAnalytics from './pages/admin/Analytics';

import Home from './pages/Home';

// We will implement these components later
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
    <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{title}</h1>
  </div>
);

// Basic auth guard for admin routes
const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
      <Routes>
        {/* Main Entry Point */}
        <Route path="/" element={<Home />} />
        
        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/session" element={<ActiveSession />} />
        <Route path="/student/condition" element={<MachineCondition />} />
        <Route path="/student/report-issue" element={<ReportIssue />} />
        <Route path="/student/completed" element={<SessionCompleted />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="machines" element={<AdminMachines />} />
          <Route path="sessions" element={<AdminSessions />} />
          <Route path="issues" element={<AdminIssues />} />
          <Route path="usage-history" element={<AdminUsageHistory />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Placeholder title="404 Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
