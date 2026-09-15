import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui';

export function SwadhaLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract Lotus / Star motif matching the foundation theme */}
      <path d="M50 10 C 60 40, 80 40, 90 50 C 80 60, 60 60, 50 90 C 40 60, 20 60, 10 50 C 20 40, 40 40, 50 10 Z" fill="#2ea3f2" />
      <circle cx="50" cy="50" r="15" fill="#ffffff" />
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
    }, 2000); // Splash screen visible for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className={`fixed inset-0 bg-swadha-dark flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${animatingOut ? 'opacity-0' : 'opacity-100'} z-50`}>
        <div className="animate-bounce">
          <SwadhaLogo className="w-40 h-40" />
        </div>
        <h1 className="text-white text-3xl font-bold mt-6 tracking-wide animate-pulse">
          SWADHA FOUNDATION
        </h1>
        <p className="text-swadha-blue mt-2 font-medium tracking-widest text-sm uppercase">
          Empowering Education
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-700">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Branding */}
        <div className="md:w-5/12 bg-swadha-dark p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-swadha-blue rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-swadha-blue rounded-full opacity-10 blur-2xl"></div>
          
          <SwadhaLogo className="w-24 h-24 mb-6 z-10" />
          <h1 className="text-3xl font-bold text-white mb-2 z-10">Swadha</h1>
          <h2 className="text-xl font-medium text-slate-300 mb-6 z-10">Foundation</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed z-10">
            Common Machine Usage Tracking System. 
            Facilitating and radically improving access to higher education for the economically underprivileged.
          </p>
        </div>

        {/* Right Side - Portals */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Select Portal</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Portal Card */}
            <button 
              onClick={() => navigate('/student/login')}
              className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border-2 border-transparent hover:border-swadha-blue hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 text-swadha-blue rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Student Portal</h4>
              <p className="text-xs text-slate-500 mt-2 text-center">Log machine usage & report issues</p>
            </button>

            {/* Admin Portal Card */}
            <button 
              onClick={() => navigate('/admin/login')}
              className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border-2 border-transparent hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Admin Portal</h4>
              <p className="text-xs text-slate-500 mt-2 text-center">Manage machines & view analytics</p>
            </button>

          </div>
        </div>
      </div>
      
      <p className="text-slate-400 text-xs mt-8">
        &copy; {new Date().getFullYear()} Swadha Foundation. All rights reserved.
      </p>
    </div>
  );
}
