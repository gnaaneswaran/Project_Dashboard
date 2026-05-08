import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Zap, MapPin, Gauge, AlertTriangle, Tool, Navigation, Wind } from 'lucide-react';

const modes = {
  ECO: { color: "#10b981", limit: 40, bg: "bg-emerald-500/10" },
  NORMAL: { color: "#3b82f6", limit: 60, bg: "bg-blue-500/10" },
  SPORT: { color: "#f43f5e", limit: 80, bg: "bg-rose-500/10" }
};

export default function ClusterMain({ data }) {
  const [mode, setMode] = useState('SPORT');
  const [showMode, setShowMode] = useState(false);
  const [trip, setTrip] = useState('ODO');

  const Card = ({ children, className = "" }) => (
    <div className={`bg-[#0d1b2e] border border-[#38bdf8]/30 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="w-full h-full bg-[#070f1d] text-slate-200 p-1 flex flex-col font-sans border-[12px] border-[#1a2638] rounded-[3rem] shadow-2xl">

      {/* --- TOP BAR --- */}
      <div className="h-14 flex justify-between items-center px-8 border-b border-slate-800/50">
        <div className="text-2xl font-bold text-[#38bdf8]">10:42 AM</div>

        <div className="relative">
          <button
            onClick={() => setShowMode(!showMode)}
            className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-1 rounded-full"
          >
            {Object.keys(modes).map(m => (
              <span key={m} className={`text-sm font-black italic ${mode === m ? 'opacity-100' : 'opacity-20'}`} style={{ color: modes[m].color }}>{m}</span>
            ))}
          </button>
          <AnimatePresence>
            {showMode && (
              <div className="absolute top-12 left-0 w-full bg-[#0d1b2e] border border-slate-700 rounded-xl overflow-hidden z-50">
                {Object.keys(modes).map(m => (
                  <button key={m} onClick={() => { setMode(m); setShowMode(false); }} className="w-full p-3 hover:bg-slate-800 text-center font-bold">{m}</button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center text-xs text-slate-500">
            <span className={data.wifi ? 'text-blue-400' : ''}>WiFi ●</span>
            <span className={data.bt ? 'text-blue-400' : ''}>BT ●</span>
          </div>
          <div className="text-xl font-bold text-[#38bdf8]">{data.battery || 78}%</div>
          <div className="text-xl font-bold text-orange-400">{data.temp || 28}°C</div>
        </div>
      </div>

      {/* --- MAIN 3-COLUMN LAYOUT --- */}
      <div className="flex-1 grid grid-cols-12 gap-3 p-3 overflow-hidden">

        {/* LEFT COLUMN */}
        <div className="col-span-3 flex flex-col gap-3">
          <Card className="flex-1 flex flex-col items-center justify-center relative">
            <svg className="w-32 h-32 -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#1a2638" strokeWidth="10" fill="none" />
              <circle cx="64" cy="64" r="50" stroke="#10b981" strokeWidth="10" fill="none" strokeDasharray="314" strokeDashoffset={314 - (314 * (data.battery || 85) / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
              <span className="text-3xl font-black">{data.battery || 85}%</span>
              <span className="text-[10px] text-slate-500">BATTERY</span>
            </div>
          </Card>
          <Card className="h-24 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Range</p>
            <p className="text-3xl font-black text-[#38bdf8]">112 <span className="text-xs">km</span></p>
          </Card>
          <Card className="h-24 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Energy</p>
            <p className="text-3xl font-black">24 <span className="text-xs text-slate-500">Wh/km</span></p>
          </Card>
          <button className="h-16 bg-[#10b981]/20 border border-[#10b981] rounded-2xl font-black text-[#10b981] text-xs">REGEN ACTIVE</button>
        </div>

        {/* CENTER COLUMN (SPEEDO) */}
        <div className="col-span-6 flex flex-col gap-3">
          <Card className="flex-[3] relative flex flex-col items-center justify-center overflow-hidden">
            <svg className="absolute top-4 w-[480px]">
              <path d="M 80 200 A 140 140 0 0 1 400 200" stroke="#1a2638" strokeWidth="14" fill="none" strokeLinecap="round" />
              <motion.path d="M 80 200 A 140 140 0 0 1 400 200" stroke={modes[mode].color} strokeWidth="14" fill="none" strokeLinecap="round"
                strokeDasharray="440" animate={{ strokeDashoffset: 440 - (440 * (data.speed || 0)) / 120 }} />
            </svg>
            <h1 className="text-[11rem] font-black italic leading-none">{data.speed || 0}</h1>
            <p className="text-slate-500 tracking-[0.8em] font-bold text-sm">km/h</p>
            <div className="mt-4 bg-slate-900 border border-slate-700 px-6 py-1 rounded-full text-[10px] font-black text-[#38bdf8]">
              LIMIT {modes[mode].limit} KM/H
            </div>
          </Card>
          <div className="h-24 flex gap-3">
            <Card className="flex-1 text-center cursor-pointer" onClick={() => setTrip('ODO')}>
              <p className="text-[10px] text-slate-500 font-bold">ODO</p>
              <p className="text-2xl font-black">4821.4 <span className="text-xs">km</span></p>
            </Card>
            <Card className="flex-1 text-center cursor-pointer" onClick={() => setTrip('TRIP A')}>
              <p className="text-[10px] text-slate-500 font-bold">TRIP A</p>
              <p className="text-2xl font-black text-emerald-400">12.4 <span className="text-xs">km</span></p>
            </Card>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-3 flex flex-col gap-3">
          <Card className="flex-1 border-blue-500/50">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <Navigation size={16} /> <span className="text-[10px] font-black uppercase">Navigation</span>
            </div>
            <p className="text-lg font-bold">MG Road</p>
            <p className="text-xs text-slate-500">2.4 km | ETA 8 min</p>
          </Card>
          <Card className="flex-1 border-rose-500/50 bg-rose-500/5">
            <div className="flex items-center gap-2 mb-1 text-rose-500">
              <AlertTriangle size={16} /> <span className="text-[10px] font-black uppercase">Motor Temp</span>
            </div>
            <p className="text-sm font-bold text-rose-500">HIGH TEMP WARNING!</p>
          </Card>
          <Card className="flex-1 border-blue-400/30">
            <div className="flex items-center gap-2 mb-1 text-slate-400">
              <Tool size={16} /> <span className="text-[10px] font-black uppercase">Service</span>
            </div>
            <p className="text-lg font-bold text-slate-200">500 <span className="text-xs">km left</span></p>
          </Card>
          <div className="grid grid-cols-2 gap-2 h-16">
            <Card className="p-2 text-center flex flex-col justify-center">
              <p className="text-[8px] text-slate-500 uppercase">Avg Spd</p>
              <p className="font-bold">32 <span className="text-[10px]">km/h</span></p>
            </Card>
            <Card className="p-2 text-center flex flex-col justify-center">
              <p className="text-[8px] text-slate-500 uppercase">Top Spd</p>
              <p className="font-bold">88 <span className="text-[10px]">km/h</span></p>
            </Card>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="h-12 bg-slate-900/80 rounded-b-[2rem] flex items-center justify-between px-10 text-[10px] font-bold">
        <div className="flex gap-8">
          <span className="text-[#38bdf8]">ED HIGH BEAM</span>
          <span className="text-emerald-500">ABS OK</span>
          <span className="text-emerald-500">SIDE STAND OK</span>
        </div>
        <div className="flex gap-8">
          <span>AVG SPD <span className="text-slate-100 ml-1">32 km/h</span></span>
          <span>TOP SPD <span className="text-slate-100 ml-1">88 km/h</span></span>
          <span className="text-emerald-500">CO2 SAVED 1.2 kg</span>
        </div>
      </div>
    </div>
  );
}