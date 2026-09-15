import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, GraduationCap } from 'lucide-react';

export function SwadhaLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract Lotus / Star motif matching the foundation theme */}
      <path className="animate-draw" d="M50 10 C 60 40, 80 40, 90 50 C 80 60, 60 60, 50 90 C 40 60, 20 60, 10 50 C 20 40, 40 40, 50 10 Z" stroke="#2ea3f2" strokeWidth="2" fill="rgba(46, 163, 242, 0.8)" />
      <circle cx="50" cy="50" r="15" fill="#ffffff" className="animate-pulse" />
      <path d="M50 40 L53 47 L60 50 L53 53 L50 60 L47 53 L40 50 L47 47 Z" fill="#2ea3f2" />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatingOut(true);
      setTimeout(() => setShowSplash(false), 500); // 500ms for fade out transition
    }, 2500); // Splash screen visible for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className={`fixed inset-0 bg-swadha-dark flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${animatingOut ? 'opacity-0' : 'opacity-100'} z-50`}>
        <div className="animate-float">
          <SwadhaLogo className="w-48 h-48 drop-shadow-[0_0_15px_rgba(46,163,242,0.5)]" />
        </div>
        <h1 className="text-white text-4xl font-heading font-bold mt-8 tracking-wider opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          SWADHA FOUNDATION
        </h1>
        <p className="text-swadha-blue mt-3 font-sans font-medium tracking-[0.3em] text-sm uppercase opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Empowering Education
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-swadha-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 bg-white/60 backdrop-blur-xl border border-white/50 opacity-0 animate-fade-in-up">
        
        {/* Left Side - Branding */}
        <div className="md:w-5/12 bg-swadha-dark/95 backdrop-blur-md p-10 md:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden border-r border-white/10">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-swadha-blue/10 to-transparent"></div>
          
          <SwadhaLogo className="w-28 h-28 mb-8 z-10 animate-float" />
          <h1 className="text-4xl font-heading font-bold text-white mb-2 z-10 tracking-tight">Swadha</h1>
          <h2 className="text-xl font-heading font-medium text-swadha-blue mb-8 z-10 tracking-wide uppercase">Foundation</h2>
          
          <p className="text-slate-300 text-sm leading-relaxed z-10 font-light opacity-90 max-w-[280px]">
            Facilitating and radically improving access to higher education for the economically underprivileged.
          </p>
        </div>

        {/* Right Side - Portals */}
        <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white/40">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-heading font-bold text-slate-800 tracking-tight">Welcome</h3>
            <p className="text-slate-500 mt-2 text-sm">Please select your designated portal to continue.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Portal Card */}
            <button 
              onClick={() => navigate('/student/login')}
              className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-swadha-blue/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-20 h-20 bg-blue-50 text-swadha-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-swadha-blue group-hover:text-white transition-all duration-500 shadow-inner">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h4 className="relative z-10 text-xl font-heading font-bold text-slate-800 mb-2">Student Portal</h4>
              <p className="relative z-10 text-sm text-slate-500 text-center font-medium">Log machine usage & report issues</p>
            </button>

            {/* Admin Portal Card */}
            <button 
              onClick={() => navigate('/admin/login')}
              className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <Lock className="w-10 h-10" />
              </div>
              <h4 className="relative z-10 text-xl font-heading font-bold text-slate-800 mb-2">Admin Portal</h4>
              <p className="relative z-10 text-sm text-slate-500 text-center font-medium">Manage machines & analytics</p>
            </button>

          </div>
        </div>
      </div>
      
      <p className="absolute bottom-6 text-slate-400 text-sm font-medium opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        &copy; {new Date().getFullYear()} Swadha Foundation. All rights reserved.
      </p>
    </div>
  );
}
