import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Wifi, CloudRain, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  title: string;
}

export default function Header({ isSimulating, onToggleSimulation, title }: HeaderProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
      setDate(now.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full h-16 flex items-center justify-between px-6 bg-gradient-to-b from-[#091530] to-[#040a1b] border-b border-[#142544] select-none">
      {/* Decorative cyber grid background lines */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />

      {/* Left section: Live Indicator & Weather/Telemetry */}
      <div className="flex items-center gap-4 text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#102447]/60 rounded-full border border-[#1e40a6]/40">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isSimulating ? 'animate-ping' : ''}`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] tracking-wider uppercase">SYSTEM LIVE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-[#5f759e]">
          <div className="flex items-center gap-1.5">
            <CloudRain size={14} className="text-cyan-400/80" />
            <span>22°C 阴/微风</span>
          </div>
          <div className="h-3 w-[1px] bg-[#142544]" />
          <div className="flex items-center gap-1.5">
            <Wifi size={14} className="text-emerald-400" />
            <span>延迟: <span className="font-semibold text-emerald-400 font-mono">14ms</span></span>
          </div>
          <div className="h-3 w-[1px] bg-[#142544]" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Secured Mode</span>
          </div>
        </div>
      </div>

      {/* Center Section: Main Title & Glowing Trapezius Header Design */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-14 flex flex-col justify-center items-center">
        <div className="relative px-12 py-1 bg-gradient-to-b from-[#102553] to-[#040a1b]/40 border-b-2 border-b-[#00f0ff] rounded-b-2xl shadow-[0_4px_25px_rgba(6,182,212,0.15)] flex justify-center items-center">
          <h1 className="text-xl md:text-2xl font-semibold tracking-widest text-[#00f0ff] font-display glow-cyan">
            {title}
          </h1>
          {/* Subtle details */}
          <div className="absolute -left-2 top-0 text-[8px] font-mono text-cyan-500/40">[{'<'}{'<'} AUTO SYSTEM]</div>
          <div className="absolute -right-2 top-0 text-[8px] font-mono text-cyan-500/40">[SYS v4.12]{'>'}{'>'}</div>
        </div>
      </div>

      {/* Right Section: Time & Controls */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#5f759e]">
        <button
          onClick={onToggleSimulation}
          className={`flex items-center gap-1.5 px-3 py-1 rounded bg-[#102447]/60 hover:bg-[#1a386d]/80 text-[#00f0ff] border border-cyan-500/30 font-medium transition-all active:scale-95 cursor-pointer`}
          title={isSimulating ? '暂停数据模拟' : '开启数据模拟'}
        >
          {isSimulating ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{isSimulating ? '暂停模拟' : '开始模拟'}</span>
        </button>

        <div className="h-8 w-[1px] bg-[#142544] hidden sm:block" />

        <div className="flex flex-col items-end leading-tight text-right select-none">
          <span className="text-cyan-400 font-semibold tracking-wider font-mono text-sm">{time}</span>
          <span className="text-[10px] text-[#4d5f80]">{date}</span>
        </div>
      </div>
    </header>
  );
}
