import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

const socket = io('http://localhost:4000');

function App() {
  const [data, setData] = useState({ speed: 0, battery: 78, temp: 28, mode: 'SPORT' });

  useEffect(() => {
    socket.on('VEHICLE_DATA', (payload) => setData(payload));
    return () => socket.off('VEHICLE_DATA');
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 font-sans flex flex-col justify-between">
      <div className="flex justify-between items-center px-10 py-4 bg-[#0f172a] rounded-2xl border border-slate-800">
        <div className="text-2xl font-bold text-blue-400 font-mono">10:42</div>
        <div className="bg-blue-600 px-6 py-1 rounded-lg font-black italic">{data.mode}</div>
        <div className="text-2xl font-bold text-orange-400">{data.temp}°C</div>
      </div>

      <div className="flex justify-center items-center relative py-10">
        <svg className="absolute w-[600px] h-[300px]">
          <path d="M 100 250 A 200 200 0 0 1 500 250" stroke="#1e293b" strokeWidth="20" fill="none" strokeLinecap="round"/>
          <motion.path d="M 100 250 A 200 200 0 0 1 500 250" stroke="#3b82f6" strokeWidth="20" fill="none" strokeLinecap="round"
            strokeDasharray="628" animate={{ strokeDashoffset: 628 - (628 * data.speed) / 120 }} />
        </svg>
        <div className="text-center z-10">
          <motion.h1 className="text-[12rem] font-black leading-none italic">{data.speed}</motion.h1>
          <p className="text-2xl text-slate-500 tracking-[1em] uppercase font-light">km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 bg-[#0f172a]/50 p-6 rounded-3xl border border-slate-800 text-center">
        <div><p className="text-slate-500 text-xs">BATTERY</p><p className="text-2xl font-bold text-emerald-400">{Math.round(data.battery)}%</p></div>
        <div className="border-l border-slate-800"><p className="text-slate-500 text-xs">RANGE</p><p className="text-2xl font-bold text-blue-400">87 km</p></div>
        <div className="border-l border-slate-800"><p className="text-slate-500 text-xs">ODO</p><p className="text-2xl font-bold font-mono">4821</p></div>
        <div className="border-l border-slate-800"><p className="text-slate-500 text-xs">ABS</p><p className="text-2xl font-bold text-emerald-400">OK</p></div>
      </div>
    </div>
  );
}

export default App;