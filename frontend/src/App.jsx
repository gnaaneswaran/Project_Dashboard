import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

const socket = io('http://localhost:4000');

function App() {
  const [data, setData] = useState({ speed: 0, battery: 0, temp: 0, mode: '...' });

  useEffect(() => {
    socket.on('VEHICLE_DATA', (payload) => setData(payload));
    return () => socket.off('VEHICLE_DATA');
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 font-sans flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex justify-between items-center px-10 py-4 bg-[#0f172a] rounded-2xl border border-slate-800">
        <div className="text-2xl font-bold text-blue-400 font-mono">10:42</div>
        <div className="bg-blue-600 px-6 py-1 rounded-lg font-black italic">{data.mode}</div>
        <div className="text-2xl font-bold text-orange-400">{data.temp}°C</div>
      </div>

      {/* Main Display Area */}
      <div className="flex justify-center items-center relative py-10">
        {/* Speed Arc */}
        <svg className="absolute w-[600px] h-[300px]">
          <path d="M 100 250 A 200 200 0 0 1 500 250" stroke="#1e293b" strokeWidth="20" fill="none" strokeLinecap="round"/>
          <motion.path 
            d="M 100 250 A 200 200 0 0 1 500 250" stroke="#3b82f6" strokeWidth="20" fill="none" strokeLinecap="round"
            strokeDasharray="628" animate={{ strokeDashoffset: 628 - (628 * data.speed) / 120 }}
          />
        </svg>
        
        <div className="text-center z-10">
          <motion.h1 className="text-[12rem] font-black leading-none italic">{data.speed}</motion.h1>
          <p className="text-2xl text-slate-500 tracking-[1em] uppercase">km/h</p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-4 gap-4 bg-[#0f172a]/50 p-6 rounded-3xl border border-slate-800">
        <div className="text-center">
          <p className="text-slate-500 text-xs uppercase">Battery</p>
          <p className="text-2xl font-bold text-emerald-400">{Math.round(data.battery)}%</p>
        </div>
        <div className="text-center border-l border-slate-800">
          <p className="text-slate-500 text-xs uppercase">Range</p>
          <p className="text-2xl font-bold text-blue-400">87 km</p>
        </div>
        <div className="text-center border-l border-slate-800">
          <p className="text-slate-500 text-xs uppercase">Odo</p>
          <p className="text-2xl font-bold text-slate-200">4,821 km</p>
        </div>
        <div className="text-center border-l border-slate-800">
          <p className="text-slate-500 text-xs uppercase">ABS</p>
          <p className="text-2xl font-bold text-emerald-400">READY</p>
        </div>
      </div>
    </div>
  );
}

export default App;